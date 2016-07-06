/* 
 * Giovanni Fiore - www.giovannifiore.net
 */

$(document).ajaxComplete(function () {
    $('[data-toggle="tooltip"]').tooltip()
})

$(document).ready(function () {


    var url = "https://www.deskbookers.com/nl-nl/sajax.json?q=Amsterdam&type=-&people=any&favorite=0&pid=&sw=52.293753,4.634942&ne=52.455562,5.162286&ids=17201,19640,13692,13691,12136,17938,15292,14886,14885,14884,14883,15730,15353,15351,15330,15080,17290,15454,15451,15379";
    $.ajax({
        dataType: "json",
        url: url
    })
            .done(function (data) {
                //console.table(data.rows);
                setMarkers(data.rows);
                createDivs(data.rows);
            });
});
function setMarkers(data) {
    var map = new GMaps({
        el: '#map',
        lat: 52.3740300,
        lng: 4.8896900,
        zoom: 11
    });
    var markers = [];
    $.each(data, function (i, item) {
        
        //alert(item.coordinate[0] + " -- " + item.coordinate[1]);
        markers.push({
            lat: item.coordinate[0],
            lng: item.coordinate[1],
            title: item.name,
            click: function (e) {

                $('.panel').each(function (i, item) {
                    $(item).removeClass('panel-yellow');
                    $('#' + i).addClass('panel-green');
                });
                $('#' + i).removeClass('panel-green');
                $('#' + i).addClass('panel-yellow');
            },
            infoWindow: {
                content: '<p><strong>' + item.location_name + '</strong></p>' + '<span>' + item.address[0] + '</span><br>' + '<span>' + item.address[1] + '</span>'
            },
            mouseover: function () {
                (this.infoWindow).open(this.map, this);
            },
            mouseout: function () {
                this.infoWindow.close();
            }

        });
    });
    map.addMarkers(markers);
}


function createDivs(data) {

    $.each(data, function (i, item) {
        $('<div>')
                .addClass("col-xs-3 col-sm-3")
                .append($('<div></div>')
                        .addClass("panel panel-green")
                        .attr('id', i)
                        .append($('<div></div>')
                                .addClass("panel-heading")
                                .html("<h4>" + item.name + "</h4>")
                                )
                        .append($('<div></div>')
                                .addClass("panel-body")
                                .append($(createIcon('map-marker', '')))
                                .append($(createLocationSpan(item.location_name)))
                                .append("<br>")
                                .append($(createIcon('globe', '')))
                                .append($(createCitySpan(item.location_city)))
                                .append($('<p></p>'))
                                .append($(createImage(item.image_urls)))
                                )
                        .append($('<div></div>')
                                .addClass("panel-footer")
                                .attr("id", "panel-footer" + i)
                                )).appendTo("#dynamicContent");
        var s;
        $.each(item.facility_icons, function (i2, item2) {
            // alert(item.facility_icons);
            s = $('<span>')
                    .append($(createServiceIcons(item2)))
                    .append(" ")

            s.appendTo("#panel-footer" + i);
        });
    });
}

function createCitySpan(data) {
    var city = $('<span>')
            .addClass("")
            .text(" " + data)
    return city;
}

function createLocationSpan(data) {
    var location = $('<span>')
            .addClass("")
            .text(" " + data)
    return location;
}

function createImage(data) {
    var img = $('<img />', {
        src: data[0],
        width: '290px'
    })
            .addClass("img-responsive")
    return img;
}

function createAddress(data) {
    var addr = $('<i></i>')

    return addr;
}

function createIcon(iconName, classes) {
    var icn = $('<i></i>')
            .addClass("fa fa-" + iconName)
            .addClass(classes)
            .attr("aria-hidden", "true")
    return icn;
}

function createServiceIcons(data) {
    var icns = $('<li></li>')
            .text(data.name + " ")
            .addClass("label label-success")
            .append($("<span></span>")
                    .addClass("fa " + data.icon)
                    )
    return icns;
}


