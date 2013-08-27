angular.module('tuner').service('PitchConverter', function() {

    //
    // Public interface

    return {
        pitchToFrequency: pitchToFrequency
    };

    //
    // Private helpers

    function pitchToFrequency(pitchString) {
        // param should be [A-Z](#)[0-9]
        var A4           = 440, // Hz
            pitch        = parsePitch(pitchString),
            semitoneDiff = getSemitoneDiff(pitch);

        return A4 * Math.pow(Math.pow(2, 1/12), semitoneDiff);
    };

    function parsePitch(pitchString) {
        var key =  pitchString[0].toUpperCase(),
            sharp = pitchString[1] === '#',
            octave;

        if(sharp) octave = pitchString[2];
        else      octave = pitchString[1];

        return {
            key: key,
            sharp: sharp,
            octave: parseInt(octave)
        };
    }

    function getSemitoneDiff(pitch) {
        // Diff relative to A4 that is (Octaves begin at C4 and end at B4)
        var relPitch = {
            key: 'A',
            sharp: false,
            octave: 4
        };

        return ((pitch.octave - relPitch.octave) * 12) + getSemitonesFromA(pitch);
    }

    function getSemitonesFromA(pitch) {
        var diff;

        switch(pitch.key) {
            case 'A':
                if(!pitch.sharp) diff = 0;
                else             diff = 1;
                break;
            case 'B':
                diff = 2;
                break;
            case 'C':
                if(!pitch.sharp) diff = -9;
                else             diff = -8;
                break;
            case 'D':
                if(!pitch.sharp) diff = -7;
                else             diff = -6;
                break;
            case 'E':
                diff = -5;
                break;
            case 'F':
                if(!pitch.sharp) diff = -4;
                else             diff = -3;
                break;
            case 'G':
                if(!pitch.sharp) diff = -2;
                else             diff = -1;
                break;
        }

        return diff;
    }
});


angular.module('tuner').service('SinOscillator', function() {

    var context = new AudioContext,
        vco =     context.createOscillator(),
        vca =     context.createGain();

    vco.type = vco.SINE;
    vco.frequency.value = 440;
    vco.start(0);

    vca.gain.value = 0;
    vco.connect(vca);
    vca.connect(context.destination);

    return {
        play: function(frequency) {
            vco.frequency.value = frequency;
            vca.gain.value = 1;
        },
        stop: function() {
            vca.gain.value = 0;
        }
    };
});