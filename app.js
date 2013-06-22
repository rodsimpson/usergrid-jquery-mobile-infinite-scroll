$(function() {

  //boolean to mark when page has scrolled
  var didScroll = false;

  //Set up the usergrid client (dogs var will hold the collection)
  var dogs;
  var client = new Usergrid.Client({
    orgName:'yourorgname', // Your Usergrid organization name (or apigee.com username for App Services)
    appName:'dogs' // Your Usergrid app name
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

  //detect when the window has been scrolled
  $(window).scroll(function() {
    didScroll = true;
  });

  //timer to check to see if we need to ping the API - window must have scrolled to bottom
  setInterval(function() {
    if (didScroll) {
      didScroll = false;
      if ($(window).scrollTop() && $(window).scrollTop() + 200 > $(document).height() - $(window).height()) {
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
  }, 250);

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
