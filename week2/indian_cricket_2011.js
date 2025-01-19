// Connect to the indianCricket2011 database
use indianCricket2011;

// Insert sample data for Indian cricket players from the 2011 World Cup squad
db.indianCricket2011.insertMany([
  { playerId: 1, name: "MS Dhoni", role: "Wicketkeeper Batsman", runs: 10773, wickets: 1, ranking: 1, age: 39 },
  { playerId: 2, name: "Sachin Tendulkar", role: "Batsman", runs: 18426, wickets: 154, ranking: 2, age: 47 },
  { playerId: 3, name: "Virender Sehwag", role: "Batsman", runs: 8273, wickets: 96, ranking: 5, age: 42 },
  { playerId: 4, name: "Virat Kohli", role: "Batsman", runs: 12809, wickets: 4, ranking: 3, age: 35 },
  { playerId: 5, name: "Yuvraj Singh", role: "All-rounder", runs: 8701, wickets: 111, ranking: 4, age: 41 },
  { playerId: 6, name: "Zaheer Khan", role: "Bowler", runs: 792, wickets: 282, ranking: 6, age: 45 },
  { playerId: 7, name: "Harbhajan Singh", role: "Bowler", runs: 1237, wickets: 269, ranking: 7, age: 44 },
  { playerId: 8, name: "Gautam Gambhir", role: "Batsman", runs: 5238, wickets: 0, ranking: 8, age: 42 },
  { playerId: 9, name: "Suresh Raina", role: "All-rounder", runs: 5615, wickets: 36, ranking: 9, age: 37 },
  { playerId: 10, name: "Munaf Patel", role: "Bowler", runs: 192, wickets: 86, ranking: 10, age: 40 }
]);

// 1. Find players who have scored more than 5000 runs and are aged below 40.
print("Players with more than 5000 runs and age below 40:");
printjson(db.indianCricket2011.find({ runs: { $gt: 5000 }, age: { $lt: 40 } }).toArray());

// 2. Find all bowlers with more than 200 wickets.
print("Bowlers with more than 200 wickets:");
printjson(db.indianCricket2011.find({ role: "Bowler", wickets: { $gt: 200 } }).toArray());

// 3. Retrieve players who are either batsmen or all-rounders.
print("Batsmen and All-rounders:");
printjson(db.indianCricket2011.find({ role: { $in: ["Batsman", "All-rounder"] } }).toArray());

// 4. Find players ranked between 1 and 5 and sort them by runs scored in descending order.
print("Players ranked between 1 and 5 sorted by runs:");
printjson(db.indianCricket2011.find({ ranking: { $gte: 1, $lte: 5 } }).sort({ runs: -1 }).toArray());

// 5. Count the number of all-rounders in the squad.
print("Total number of all-rounders:");
print(db.indianCricket2011.countDocuments({ role: "All-rounder" }));
