import React from "react";
import Region from "./Region";

let europe = {
  regionName: "Europe",
  countries: [
    {
      name: "Ireland"
    },
    {
      name: "Spain"
    },
    {
      name: "Italy"
    }
  ]
}
//     {
//       regionName: "Asia",
//       countries: [
//         {
//           name: "Russia"
//         },
//         {
//           name: "Mongolia"
//         },
//         {
//           name: "Vietnam"
//         },
//         {
//           name: "India"
//         }
//       ]
//     },
//     {
//       regionName: "The Americas",
//       countries: [
//         {
//           name: "Mexico"
//         },
//         {
//           name: "Canada"
//         },
//         {
//           name: "Belize"
//         }
//       ]
//     },
//     {
//       regionName: "Africa",
//       countries: [
//         {
//           name: "Egypt"
//         },
//         {
//           name: "South Africa"
//         },
//         {
//           name: "Kenya"
//         },
//         {
//           name: "Ethiopia"
//         }
//       ]
//     },
//     {
//       regionName: "Oceania",
//       countries: [
//         {
//           name: "Australia"
//         },
//         {
//           name: "New Zealand"
//         },
//         {
//           name: "Fiji"
//         }
//       ]
//     }
//   ] 
// }

export default class Countries extends React.Component {
  render() {
    return (
      <div>
        <Region region={europe} />
      </div>
    )
  }
}