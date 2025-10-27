// 100 sample players for FootballGuess
const players = [
  {
    id: 1,
    name: "John Smith",
    college: "USC",
    year_of_birth: 2000,
    height: 72,
    weight: 190,
    image_url: "/player_images/1.jpg",
    player_index: 1,
    jersi_number: 10,
    position_group: "Quarterback",
    nfl_draft_year: 2020,
    nfl_draft_round: 1
  },
  {
    id: 2,
    name: "Mike Johnson",
    college: "Texas A&M",
    year_of_birth: 1998,
    height: 74,
    weight: 200,
    image_url: "/player_images/2.jpg",
    player_index: 2,
    jersi_number: 22,
    position_group: "Running Back",
    nfl_draft_year: 2019,
    nfl_draft_round: 2
  },
  {
    id: 3,
    name: "Chris Lee",
    college: "Florida State",
    year_of_birth: 2001,
    height: 71,
    weight: 185,
    image_url: "/player_images/3.jpg",
    player_index: 3,
    jersi_number: 7,
    position_group: "Wide Receiver",
    nfl_draft_year: 2021,
    nfl_draft_round: 3
  },
  {
    id: 4,
    name: "David Kim",
    college: "Syracuse",
    year_of_birth: 1999,
    height: 73,
    weight: 195,
    image_url: "/player_images/4.jpg",
    player_index: 4,
    jersi_number: 55,
    position_group: "Linebacker",
    nfl_draft_year: 2018,
    nfl_draft_round: 4
  },
  {
    id: 5,
    name: "Alex Martinez",
    college: "Arizona State",
    year_of_birth: 1997,
    height: 75,
    weight: 210,
    image_url: "/player_images/5.jpg",
    player_index: 5,
    jersi_number: 88,
    position_group: "Tight End",
    nfl_draft_year: 2017,
    nfl_draft_round: 5
  },
  // ... 95 more players ...
];

// Fill up to 100 players with unique names and indices
const colleges = ["USC", "Texas A&M", "Florida State", "Syracuse", "Arizona State", "Oregon", "Nevada", "Tennessee", "Colorado", "Minnesota", "Kansas", "New Mexico"];
const positions = ["Quarterback", "Running Back", "Wide Receiver", "Linebacker", "Tight End", "Cornerback", "Safety", "Defensive End", "Kicker", "Offensive Lineman"];
for (let i = 6; i <= 100; i++) {
  players.push({
    id: i,
    name: `Player ${i}`,
    college: colleges[i%colleges.length],
    year_of_birth: 1990 + (i % 15),
    height: 68 + (i % 10),
    weight: 170 + (i % 40),
    image_url: `/player_images/${i}.jpg`,
    player_index: i,
    jersi_number: 1 + (i % 99),
    position_group: positions[i % positions.length],
    nfl_draft_year: 2010 + (i % 16),
    nfl_draft_round: 1 + (i % 7)
  });
}

export default players;
