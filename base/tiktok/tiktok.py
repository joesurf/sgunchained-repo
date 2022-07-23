# Importing the tiktok Python SDK
from TikTokApi import TikTokApi
# Import JSON for export of data
import json
# Import data processing helper
from helpers import process_results 
# Import pandas to create dataframes
import pandas as pd
# Import sys dependency to extract command line arguments
import sys

with TikTokApi() as api: # .get_instance no longer exists
    for video in api.hashtag(name='funny').videos():
        url = f"https://www.tiktok.com/@{video.author.username}/video/{video.id}"
        print(url)


# with open('export.json', 'w') as f:
#     json.dump(user_stats, f)