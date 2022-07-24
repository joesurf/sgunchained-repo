import os
import csv
import sys
import re

from surprise import Dataset
from surprise import Reader

from collections import defaultdict
import numpy as np
import pandas as pd


class Item:

    itemID_to_name = {}
    name_to_itemID = {}

    def __init__(self, activityList, ratingList):
      self.itemList = activityList
      self.ratingList = ratingList

    
    def loadItem(self):

        # Look for files relative to the directory we are running from
        #os.chdir(os.path.dirname(sys.argv[0]))

        ratingsDataset = 0
        self.itemID_to_name = {}
        self.name_to_itemID = {}

        reader = Reader(line_format='user item rating', sep=',', skip_lines=1)

        df = pd.DataFrame(self.ratingList)
        df = df.drop('_id', axis=1)
        cols = ['user_id', 'activity_id', 'rating']
        df = df[cols]

        # ratingsDataset = Dataset.load_from_file(self.ratingsPath, reader=reader)
        ratingsDataset = Dataset.load_from_df(df, reader)


        for item in self.itemList:
            itemID = item['_id']
            itemName = item['name']
            self.itemID_to_name[itemID] = itemName
            self.name_to_itemID[itemName] = itemID

        return ratingsDataset

    def getUserRatings(self, user):
        userRatings = []
        hitUser = False

        for item in self.ratingList:
            userID = int(item['user_id'])
            if (user == userID):
                itemID = int(item['activity_id'])
                rating = float(item['rating'])
                userRatings.append((itemID, rating))
                hitUser = True
            if (hitUser and (user != userID)):
                break

        return userRatings

    def getPopularityRanks(self):
        ratings = defaultdict(int)
        rankings = defaultdict(int)

        for row in self.ratingList:
            itemID = int(row['activity_id'])
            ratings[itemID] += 1
        rank = 1
        for itemID, ratingCount in sorted(ratings.items(), key=lambda x: x[1], reverse=True):
            rankings[itemID] = rank
        rank += 1

        return rankings
    
    def getGenres(self):
        genres = defaultdict(list)
        genreIDs = {}
        maxGenreID = 0

        for item in self.itemList:
            itemID = int(item['_id'])
            genreList = item['purpose'].split('|')
            genreIDList = []
            for genre in genreList:
                if genre in genreIDs:
                    genreID = genreIDs[genre]
                else:
                    genreID = maxGenreID
                    genreIDs[genre] = genreID
                    maxGenreID += 1
                genreIDList.append(genreID)
            genres[itemID] = genreIDList
        # Convert integer-encoded genre lists to bitfields that we can treat as vectors
        for (itemID, genreIDList) in genres.items():
            bitfield = [0] * maxGenreID
            for genreID in genreIDList:
                bitfield[genreID] = 1
            genres[itemID] = bitfield            
            
        return genres
    
    def getScenic(self):
        adventure = defaultdict(int)

        for item in self.itemList:
            itemID = int(item['_id'])
            adventureRating = item['adventure']
            if adventureRating:
                adventure[itemID] = int(adventureRating)

        return adventure
    
    def getItemName(self, itemID):
        if itemID in self.itemID_to_name:
            return self.itemID_to_name[itemID]
        else:
            return ""
        
    def getItemID(self, itemName):
        if itemName in self.name_to_itemID:
            return self.name_to_itemID[itemName]
        else:
            return 0
