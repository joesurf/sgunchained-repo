# -*- coding: utf-8 -*-
"""
Created on Fri May  4 16:25:39 2018

@author: Frank
"""


from Item import Item
from ContentKNNAlgorithm import ContentKNNAlgorithm
from Evaluator import Evaluator
from surprise import NormalPredictor

import random
import numpy as np

def LoadActivityData():
    act = Item()
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


