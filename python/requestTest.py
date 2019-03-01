import requests
import sqlite3
r = requests.session()

conn = sqlite3.connect('C:\\Users\\FIRSTUser\\Desktop\\254CheezyPoofs\\ScoutingDatabase.db')
c = conn.cursor()
headers = {'X-TBA-Auth-Key':'9VFw7b8DNtDJ7f6RKy7unkdk3Gl3lUml7EvDcpVQtTZTulMpYOTEu7Dd0DIYabaA'}
tba  = r.get("https://www.thebluealliance.com/api/v3/event/2018ilch/matches/simple", headers = headers)
tbAnswer = tba.json()
for match in tbAnswer:
    if match['comp_level'] == 'qm':
        matchNum = match['match_number']
        blueTeams = match['alliances']['blue']['team_keys']
        redTeams = match['alliances']['red']['team_keys']
        b1 = blueTeams[0][3:]
        b2 = blueTeams[1][3:]
        b3 = blueTeams[2][3:]
        r1 = redTeams[0][3:]
        r2 = redTeams[1][3:]
        r3 = redTeams[2][3:]
        #print(str(matchNum)+':'+b1+','+b2+','+b3+','+r1+','+r2+','+r3+'\n')
        insertStr = "insert into MatchSchedule values ({0},{1},{2},{3},{4},{5},{6})".format(matchNum, r1,r2,r3,b1,b2,b3)
        c.execute(insertStr)
        

conn.commit()
conn.close()



