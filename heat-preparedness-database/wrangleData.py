import pandas as pd
suburb_df = pd.read_csv('LocalityFinder.csv')

# get suburb and council columns from the dataset
# do some changes on some of the confusion places
suburb_df = suburb_df.dropna()
suburb_df.columns = ['Suburb','useless1','Council','useless2','useless3','useless4','useless5','Region','useless6','useless7','useless8']
suburb_df = suburb_df[['Suburb','Council','Region']]
suburb_df.drop_duplicates(inplace = True)
suburb_df.drop(index = 1,inplace = True)
suburb_df['Council'] = suburb_df['Council'].apply(lambda x:x[:-8].title())
suburb_df.loc[suburb_df[(suburb_df['Council'] == 'Yarriambiack Shire')&(suburb_df['Region'] == 'Northern Victoria')].index.tolist(),'Council'] = 'Yarriambiack Shire (North Of Netting Fence)'
suburb_df.loc[suburb_df[(suburb_df['Council'] == 'Yarriambiack Shire')&(suburb_df['Region'] == 'Western Victoria')].index.tolist(),'Council'] = 'Yarriambiack Shire (South Of Netting Fence)'
suburb_df.drop(index = suburb_df[(suburb_df['Council'] == 'Unincorporated Land (V')].index.tolist(),inplace = True)
suburb_df = suburb_df[['Suburb','Council']]
suburb_df.reset_index(drop = True, inplace = True)

# collect the latitude and longitude for councils and record which district the councils belong
district_df = pd.read_csv('Heat Wave Information Dump - Heat Plans.csv')
district_df = district_df[['Location','District','Latitude','Longitude']]
district_df = district_df.dropna(subset = ['Latitude','Longitude'])
district_df = district_df.fillna(method='ffill')
district_df['Location'] = district_df['Location'].apply(lambda x:x.title())
district_df.loc[district_df[district_df['Location'] == 'Melton Shire'].index.tolist()[0],'Location'] = 'Melton City'
district_df.loc[district_df[district_df['Location'] == 'Yarran Ranges Shire'].index.tolist()[0],'Location'] = 'Yarra Ranges Shire'
district_df.reset_index(drop = True, inplace = True)

# merge two dataframe and output data for future using
suburb = pd.merge(suburb_df,district_df,left_on = 'Council',right_on = 'Location')
suburb.drop('Location',axis = 1,inplace = True)
suburb = suburb.sort_values('Suburb')
suburb.reset_index(drop = True, inplace = True)
suburb['State'] = 'Victoria'

suburb.to_csv('Victoria_suburb.csv',index = False)
# output data looks like: 
#               Suburb | Council | District | Latitude | Longitude | State


# seperate and order the data to make it easy to inport into database by mysql workbench
district = suburb[['State','District']]
district.drop_duplicates(inplace = True)
district.to_csv('district.csv',index = False)

lga = suburb[['State','District','Council','Latitude','Longitude']]
lga.drop_duplicates(inplace = True)
lga.to_csv('concile.csv',index = False)

suburb = suburb[['State','District','Council','Suburb']]
suburb.to_csv('suburb.csv',index = False)