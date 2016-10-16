const testEvents = {
  regular: {
    _id: '123',
    name: 'Event',
    datetime: '2016-08-06T12:30:00.000Z',
    team: false,
    testing: true,
    gold: [
      {
        id: '578b1e1192ea42817afbbb0c',
        points: 3
      }
    ],
    silver: [
      {
        id: '578b2ec092ea42817afbbb8b',
        points: 2
      }
    ],
    bronze: [
      {
        id: '578b1a2d92ea42817afbbaee',
        points: 1
      }
    ]
  },
  regularNoScore: {
    _id: '123',
    name: 'Event',
    datetime: '2016-08-06T12:30:00.000Z',
    testing: true
  },
  editing: {
    _id: '123',
    name: 'Event',
    datetime: '2016-08-06T12:30:00.000Z',
    team: false,
    testing: true,
    editing: true,
    gold: [
      {
        id: '578b1e1192ea42817afbbb0c',
        points: 3
      }
    ],
    silver: [
      {
        id: '578b2ec092ea42817afbbb8b',
        points: 2
      }
    ],
    bronze: [
      {
        id: '578b1a2d92ea42817afbbaee',
        points: 1
      }
    ]
  }
}

export default testEvents
