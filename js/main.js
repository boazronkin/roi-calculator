(function () {
  'use strict';

$(function()  {

    $('#deploymentProcess .environments').change(function() {
        updateTotalEnvs();
        updateFields();
    });

    $('#isvInvestment').change(function() {
        $(this).val( getStr( $(this).val() ) );
        updateFields();
    });

     function updateTotalEnvs() {
         var envs = 0;
         $('#deploymentProcess').find(".environments").each(function() {
             var envUpdates = checkEnvUpdates($(this)[0].value);
             $(this).val(envUpdates);
             envs += envUpdates;
         });

         $('#totalEnvs').val(envs);

         function checkEnvUpdates(updates) {
             if (updates < 0) {
                     return getNum(-updates);
             }
             else {
                 return getNum(updates);
             }
         }
     }

     // $( function() {
     function initSliders() {
        var annualSprintsHandle = $( "#annualSprintsHandle" );
        $( "#annualSprints" ).slider({
            min: 1,
            max: 55,
            value: 10,
          create: function() {
            annualSprintsHandle.text( $( this ).slider( "value" ) );
          },
          slide: function( event, ui ) {
            annualSprintsHandle.text( ui.value );
        },
        change: function(event, ui) {
            updateFields();
        }
        });

        var updateHoursWithoutHandle = $( "#updateHoursWithoutHandle" );
        $( "#updateHoursWithout" ).slider({
            min: 1,
            max: 100,
            value: 20,
          create: function() {
            updateHoursWithoutHandle.text( $( this ).slider( "value" ) );
          },
          slide: function( event, ui ) {
            updateHoursWithoutHandle.text( ui.value );
        },
        change: function(event, ui) {
            updateFields();
        }
        });

        var hourlyCostWithoutHandle = $( "#hourlyCostWithoutHandle" );
        $( "#hourlyCostWithout" ).slider({
            min: 0,
            max: 500,
            step: 25,
            value: 100,
          create: function() {
            hourlyCostWithoutHandle.text( $( this ).slider( "value" ) );
          },
          slide: function( event, ui ) {
            hourlyCostWithoutHandle.text( ui.value );
        },
        change: function(event, ui) {
            updateFields();
        }
        });

        var hourlyCostWithHandle = $( "#hourlyCostWithHandle" );
        $( "#hourlyCostWith" ).slider({
            min: 0,
            max: 500,
            step: 25,
            value: 70,
          create: function() {
            hourlyCostWithHandle.text( $( this ).slider( "value" ) );
          },
          slide: function( event, ui ) {
            hourlyCostWithHandle.text( ui.value );
        },
        change: function(event, ui) {
            updateFields();
        }
        });
    }

    function updateFields() {
        // Grab updated info from readonly inputs and sliders
        var totalEnvs = getNum( $('#totalEnvs').val() );
        var annualSprints = $('#annualSprints').slider("value");
        var hourlyCostWithout = $('#hourlyCostWithout').slider('value');
        var hourlyCostWith = $('#hourlyCostWith').slider('value');
        var updateHoursWithout = $('#updateHoursWithout').slider('value');
        var isvInvestment = getNum( $('#isvInvestment').val() );

        // Update bottom line fields
        var annualUpdates = totalEnvs * annualSprints;
        $('#annualUpdates').val( getStr(annualUpdates ) );

        var updateHoursWith = updateHoursWithout / 10;
        $('#updateHoursWith').val( getStr(updateHoursWith) );

        var annualCostWithout = hourlyCostWithout *
                                                  updateHoursWithout *
                                                  annualUpdates;
        $('#annualCostWithout').val( getStr(annualCostWithout) );


        var annualCostWith = hourlyCostWith *
                                                    updateHoursWith *
                                                    annualUpdates;
        $('#annualCostWith').val( getStr(annualCostWith) );


        $('#roi').val( getStr( ( annualCostWithout -
                                                annualCostWith -
                                                isvInvestment) *
                                                100 / isvInvestment ) );
    }

    function getNum(data) {
        return parseInt( data.replace( /,/g, '' ), 10 );
    }

    function getStr(number) {
        return parseInt(number).toLocaleString();
    }

    (function main() {
            initSliders();
            updateTotalEnvs();
            updateFields();

    })();
});


})();
