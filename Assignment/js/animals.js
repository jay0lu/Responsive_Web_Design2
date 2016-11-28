/*
 * Javascript code for animals
 */

var animals_template, photos_template, photo_template, slideshow_template;
// variables to store the current animals and photos
var current_animal = animals_data.category[0];
var current_category = current_animal.animals[0];

// function that instantiates a template and display the results in current div
function showTemplate(template, data){
  var html = template(data);
  // console.log(html);
  $('#content').html(html);
}

$(document).ready(function(){
  // compile all template for use
  var source = $("#animals-template").html();
  animals_template = Handlebars.compile(source);

  source   = $("#photos-template").html();
	photos_template = Handlebars.compile(source);

	source   = $("#photo-template").html();
	photo_template = Handlebars.compile(source);

	source   = $("#slideshow-template").html();
	slideshow_template = Handlebars.compile(source);

  // click the animals tab shows the thumbnails of all the animals
  $("#animals-tab").click(function(){

    // display the animals templates
    showTemplate(animals_template, animals_data);

    // make the animal tab active
    // first make the current active tab inactive
    $(".nav-tabs .active").removeClass("active");
    // then make the animlas tab active
    $("#animals-tab").addClass("active");

    // add a click callback to each album thumbnail which displays the photos template
    $(".animals-thumbnail").click(function(){
      // get the index of animal we click
      var index = $(this).data("id");

      // set the current index
      current_animal = animals_data.category[index];

      // displays the photos template
      showTemplate(photos_template, current_animal);

      $(".photo-thumbnail").click(function(){
        var index = $(this).data("id");

        current_category = current_animal.animals[index];

        showTemplate(photo_template, current_category);


      });
    });
  });

  $("#photos-tab").click(function(){

		// displays the photos template
		showTemplate(photos_template, current_animal);

		// make the photos tab the active one
		// first make the currently active tab inactive
		$(".nav-tabs .active").removeClass("active");
		// then make photos tab active
		$("#photos-tab").addClass("active");

		// add an on click al all the photo thumbnails
		// which displays the photo in a modal popup
		$(".photo-thumbnail").click(function (){
			// get the index (position in the array)
			// of the photo we clicked on
			// "this" is the element that was clicked on
			// data("id") gets the attribute data-id
			// (which we set to the index of the photo in
			// the array - @index)
			var index = $(this).data("id");

			// set the current photo to this photo
			current_category = current_animal.animals[index];
      // console.log(current_category)

			// displays the single photo template
			showTemplate(photo_template, current_category);
		});
	});

  $("#slideshow-tab").click(function () {
		// display the slideshow template using the
		// current album
		showTemplate(slideshow_template, current_category);

		// make the slideshow tab the active one
		// first make the currently active tab inactive
		$(".nav-tabs .active").removeClass("active");
		// then make slideshow tab active
		$("#slideshow-tab").addClass("active");
	});

	// start the page by showing the albums view
	// we do this by virtually clicking on the
	// albums tab
	$("#animals-tab").click();
});
