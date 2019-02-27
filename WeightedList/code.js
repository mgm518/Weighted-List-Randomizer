var Outlist = document.getElementById('list');
var order = [];
var pair = [];
var display = 'img';

$(":button[value='Toggle View']").click(function () {
    display = display === 'img' ? "text" : "img";
    switch (display) {
        case "img":
            buildLists();
            break;
        case "text":
            buildListsText();
            break;
    }
});

var init = function () {
    //Part 1: Generating the randomly sorted list
    var total = 0;
    var position = 0;
    order = [];
    pair = [];
    var L1 = importList.list1.filter(function (obj) {
        return obj.active;
    });
    L1.sort(function (a, b) {
        return b.weight - a.weight;
    });
    L1.forEach(function (element) {
        total += element.weight;
    });
    console.clear();
    while (0 !== L1.length) {
        var choice = Math.random();
        for (i = 0; i < L1.length; i++) {
            position += L1[i].weight;
            if (position / total >= choice) {
                //console.log(choice);
                //console.log("Choose " + L1[i].name + " with " + L1[i].weight + "/" + total + " to get " + L1[i].weight / total);
                position = 0;
                total -= L1[i].weight;
                order.push(L1[i]);
                L1.splice(i, 1);
                break;
            }
        }
    }
    //Part 2: Pairing the second list with the first
    var L2 = importList.list2.filter(function (obj) {
        return obj.active;
    });
    importList.list1.forEach(function (item) {
        console.clear();
        total = 0;
        position = 0;
        L2.forEach(function (element) {
            item.bonus.forEach(function (select) {
                if (element.name === select.item) {
                    element.weight *= 1 + select.mult / 100;
                }
            });
            total += element.weight;
        });
        L2.sort(function (a, b) {
            return b.weight - a.weight;
        });
        choice = Math.random();
        console.log(choice);
        for (i = 0; i < L2.length; i++) {
            position += L2[i].weight;
            //console.log(L2[i].name + ": " + position / total);
            if (position / total >= choice) {
                //console.log("Choose " + L2[i].name + " with " + L2[i].weight + "/" + total + " to get " + L2[i].weight / total);
                position = 0;
                pair.push(L2[i]);
                break;
            }
        }
        L2.forEach(function (element, index) {
            element.weight = element.base.valueOf();
        });
    });
    localStorage.setItem("orderKey", btoa(JSON.stringify(order)) );
    localStorage.setItem("pairKey", btoa(JSON.stringify(pair)) );
};

var buildLists = function () {
    var out = "";
    Outlist.innerHTML = "";
    //order.forEach(function (element, index) {
    order.slice(0, 7).forEach(function (element, index) {
        out += '<tr><td><img src="' + element.url + '" alt="' + element.name + '"</td>' +
            '<td><img src="' + pair[index].url + '" alt="' + pair[index].name + '"</td></tr>';
    });
    Outlist.innerHTML = out;
};

var buildListsText = function () {
    var out = "";
    Outlist.innerHTML = "";
    //order.forEach(function (element, index) {
    order.slice(0, 7).forEach(function (element, index) {
        out += '<tr><td>' + element.name + '</td>' +
            '<td>' + pair[index].name + '</td></tr>';
    });
    Outlist.innerHTML = out;
};

var reroll = function () {
    init();
    switch (display) {
        case "img":
            buildLists();
            break;
        case "text":
            buildListsText();
            break;
    }
    //console.log("running main");
};

var main = function () {
    var ordertext = localStorage.getItem("orderKey");
    var pairtext = localStorage.getItem("pairKey");
    if (pairtext === null || ordertext === null) {
        init();
    } else {
        order = JSON.parse(atob(ordertext));
        pair = JSON.parse(atob(pairtext));
    }
    switch (display) {
        case "img":
            buildLists();
            break;
        case "text":
            buildListsText();
            break;
    }
    //console.log("running main");    
    //new File([JSON.stringify(pair)], "Gist.txt", {type : 'application/json'});
};

main();