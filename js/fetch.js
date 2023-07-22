fetch("../json/index.json")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    const { announcement, teachers } = data;
    $(".announcement").text(announcement);

    displayTeacherSlide(teachers);
  });

function displayTeacherSlide(teachers) {
  const { g9: data } = teachers;
  const owlCarousel = $(".teacher-carousel");

  // Loop through each item in the JSON data
  data.forEach((item) => {
    // Create the slide div element for the teacher item
    const slideDiv = $("<div>").addClass("teacher-item text-center");

    // Create the image element
    let img = $("<img>")
      .addClass("border rounded-circle p-2 mx-auto mb-3")
      .attr("style", "width: 120px; height: 120px");

    // create image
    img.attr("src", item.picture || "img/no-picture.jpg");

    // Create the teacher name element (h5)
    const nameHeading = $("<h5>").addClass("mb-0").text(item.name);

    // Create the designation element (p)
    const designationParagraph = $("<p>").text(item.designation);

    // Create the teacher-text div element
    const teacherTextDiv = $("<div>").addClass(
      "teacher-text bg-light text-center p-4"
    );

    // Create the motto in life paragraph element
    const mottoParagraph = $("<p>").addClass("mb-0").text(item.motto);

    // Append the elements to their respective parent elements
    teacherTextDiv.append(mottoParagraph);
    slideDiv.append(img, nameHeading, designationParagraph, teacherTextDiv);

    // Append the slide to the Owl Carousel
    owlCarousel.trigger("add.owl.carousel", [slideDiv]);
  });

  // Refresh the Owl Carousel to display the new slides
  owlCarousel.trigger("refresh.owl.carousel");
}
