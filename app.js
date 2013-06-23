$(function() {

  //boolean to mark when page has scrolled
  var didScroll = false;

  //Set up the usergrid client (dogs var will hold the collection)
  var dogs;
  var client = new Usergrid.Client({
    orgName:'yourorgname', // Your Usergrid organization name (or apigee.com username for App Services)
    appName:'dogs', // Your Usergrid app name
    logging: true, //optional - turn on logging, off by default
    buildCurl: true //optional - turn on curl commands, off by default
  });

  //options object specifies the collection type
  var options = {
    type:'dogs'
  }

  //Create the dogs collection as part of the page load
  client.createCollection(options, function (err, collection) {
    if (err) {
      //Error - could not make collection
      alert('error contacting API');
    } else {
      //Success - new collection created
      dogs = collection;
      buildList(dogs);
    }
  });

  var callTime = 0;
  //detect when the window has been scrolled
  $(window).scroll(function() {

    if ($(window).scrollTop() && $(window).scrollTop() + 200 > $(document).height() - $(window).height()) {
      currentTime = new Date().getTime();
      if (currentTime > callTime + 1500) {
        callTime = currentTime;
        dogs.getNextPage(function(err){
          if(err) {
            //Error - could not get previous page of dogs
            alert('error contacting API');
          } else {
            //Success - got next page of dogs, so do something with it:
            buildList(dogs);
          }
        });
      }
    }

  });

  // Function to append the next page to the scroll window
  function buildList(dogs){
    var html='';
    while(dogs.hasNextEntity()) {
      //get a reference to the dog
      dog = dogs.getNextEntity();
      //do something with the entity
      var name = dog.get('name');
      html += '<li>' + name + '</li>';
    }
    $('#scrollWindow').append(html).listview('refresh');
  }
});
