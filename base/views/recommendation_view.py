from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from base.models import Activity, Rating
from base.serializer import *

import numpy as np
import random
from surprise import NormalPredictor

from .ContentBasedRec.Item import Item
from .ContentBasedRec.Evaluator import Evaluator
from .ContentBasedRec.ContentKNNAlgorithm import ContentKNNAlgorithm


from surprise import AlgoBase
from surprise import PredictionImpossible
import math
import heapq

class ContentKNNAlgorithm(AlgoBase):

    def __init__(self, k=40, sim_options={}):
        AlgoBase.__init__(self)
        self.k = k

    def fit(self, trainset):
        AlgoBase.fit(self, trainset)

        # Compute item similarity matrix based on content attributes

        # Load up genre vectors for every movie
        activityList = list(Activity.objects.all().values())
        ratingList = list(Rating.objects.all().values())

        act = Item(activityList, ratingList)
        genres = act.getGenres()
        scenic = act.getScenic()
        
        print("Computing content-based similarity matrix...")
            
        # Compute genre distance for every movie combination as a 2x2 matrix
        self.similarities = np.zeros((self.trainset.n_items, self.trainset.n_items))
        
        for thisRating in range(self.trainset.n_items):
            if (thisRating % 100 == 0):
                print(thisRating, " of ", self.trainset.n_items)
            for otherRating in range(thisRating+1, self.trainset.n_items):
                thisActivityID = int(self.trainset.to_raw_iid(thisRating))
                otherActivityID = int(self.trainset.to_raw_iid(otherRating))
                genreSimilarity = self.computeGenreSimilarity(thisActivityID, otherActivityID, genres)
                scenicSimilarity = self.computeScenicSimilarity(thisActivityID, otherActivityID, scenic)
                self.similarities[thisRating, otherRating] = genreSimilarity * scenicSimilarity
                self.similarities[otherRating, thisRating] = self.similarities[thisRating, otherRating]
                
        print("...done.")
                
        return self
    
    def computeGenreSimilarity(self, activity1, activity2, genres):
        genres1 = genres[activity1]
        genres2 = genres[activity2]
        sumxx, sumxy, sumyy = 0, 0, 0
        for i in range(len(genres1)):
            x = genres1[i]
            y = genres2[i]
            sumxx += x * x
            sumyy += y * y
            sumxy += x * y
        
        return sumxy/math.sqrt(sumxx*sumyy)
    
    def computeScenicSimilarity(self, activity1, activity2, scenic):
        diff = abs(scenic[activity1] - scenic[activity2])
        sim = 1/math.exp(diff)
        return sim

    def estimate(self, u, i):

        if not (self.trainset.knows_user(u) and self.trainset.knows_item(i)):
            raise PredictionImpossible('User and/or item is unknown.')
        
        # Build up similarity scores between this item and everything the user rated
        neighbors = []
        for rating in self.trainset.ur[u]:
            genreSimilarity = self.similarities[i,rating[0]]
            neighbors.append( (genreSimilarity, rating[1]) )
        
        # Extract the top-K most-similar ratings
        k_neighbors = heapq.nlargest(self.k, neighbors, key=lambda t: t[0])
        
        # Compute average sim score of K neighbors weighted by user ratings
        simTotal = weightedSum = 0
        for (simScore, rating) in k_neighbors:
            if (simScore > 0):
                simTotal += simScore
                weightedSum += simScore * rating
            
        if (simTotal == 0):
            raise PredictionImpossible('No neighbors')

        predictedRating = weightedSum / simTotal

        return predictedRating
    


@api_view(['GET'])
def getRecommendation(request):
  activity = Activity.objects.get(_id="1")
  serializer = ActivitySerializer(activity, many=False)
  

  def LoadActivityData():
      activityList = list(Activity.objects.all().values())
      ratingList = list(Rating.objects.all().values())

      act = Item(activityList, ratingList)
      print("Loading activity ratings...")
      data = act.loadItem()
      print("\nComputing activity popularity ranks so we can measure novelty later...")
      rankings = act.getPopularityRanks()
      return (act, data, rankings)

  np.random.seed(0)
  random.seed(0)

  # Load up common data set for the recommender algorithms
  (act, evaluationData, rankings) = LoadActivityData()

  # Construct an Evaluator to, you know, evaluate them
  evaluator = Evaluator(evaluationData, rankings)

  contentKNN = ContentKNNAlgorithm()
  evaluator.AddAlgorithm(contentKNN, "ContentKNN")

  # Just make random recommendations
  Random = NormalPredictor()
  evaluator.AddAlgorithm(Random, "Random")

  evaluator.Evaluate(True)

  evaluator.SampleTopNRecs(act)


  return Response(serializer.data) 