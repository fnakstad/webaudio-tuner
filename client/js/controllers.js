angular.module('tuner').controller('TunerCtrl', function($scope, PitchConverter) {
    $scope.instruments = instruments;
    $scope.selectedInstrument = $scope.instruments[0];

    $scope.$watch('selectedInstrument', function() {
        $scope.tunings = $scope.selectedInstrument.tunings;
        $scope.selectedTuning = $scope.tunings[0];
    });
});

var instruments = [
    {
        "instrument": "6-stringed guitar",
        "noOfStrings": 6,
        "tunings": [
            {
                "title": "Standard",
                "pitches": ["E2", "A2", "D3", "G3", "B3", "E4"]
            },
            {
                "title": "Drop-D",
                "pitches": ["D2", "A2", "D3", "G3", "B3", "E4"]
            },
            {
                "title": "Open D",
                "pitches": ["D2", "F#2", "A3", "D3", "F#3", "A4"]
            }
        ]
    },
    {
        "instrument": "4-stringed bass",
        "noOfStrings": 4,
        "tunings": [
            {
                "title": "Standard",
                "pitches": ["E1", "A1", "D2", "G2"]
            },
            {
                "title": "Drop-D",
                "pitches": ["D1", "A1", "D2", "G2"]
            }
        ]
    }
];