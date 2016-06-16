define(function (require) {

    var Creater = require('../main.jsx');
    var AlphabetRegion = require('fcui/AlphabetRegion.jsx');

    var items = [
        {
            title: 'Normal AlphabetRegion',
            props: {}
        },
        {
            title: 'AlphabetRegion with style',
            props: {
                style: {
                    maxWidth: 400
                }
            }
        },
        {
            title: 'Disabled AlphabetRegion',
            props: {disabled: true}
        }
    ];

    return Creater(AlphabetRegion, items, 'onClick');
});