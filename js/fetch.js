fetch("https://api.jsonbin.io/v3/b/64dee5c38e4aa6225ed1bacf")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    const { announcements, teachers, menus } = data.record;
    displayTeacherSlide(teachers);
    displayAnnouncementSlides(announcements);
    displayMenus(menus);
  });

function displayTeacherSlide({ g9: data }) {
  const owlCarousel = $(".teacher-carousel");

  // Loop through each item in the JSON data
  data.forEach((item) => {
    // Create the slide div element for the teacher item
    const slideDiv = $("<div>").addClass("container teacher-item");

    const row = $("<div>").addClass("row");

    // Create the image element
    let img = $("<img>")
      .addClass(
        `col-lg-6 col-sm-12 flex align-items-center border rounded-circle p-2 mx-auto mb-3 teacher-img`
      )
      .attr("style", "width: 300px; height: 300px");

    // create image
    img.attr("src", item.picture || "img/no-picture.jpg");

    const details = $("<div>").addClass(
      `col-lg-6 col-sm-12 flex align-items-center teacher-details`
    );

    // Create the teacher name element (h5)
    const nameHeading = $("<h3>").addClass("mb-0").html(item.name);

    // Create the designation element (p)
    const designationParagraph = $("<h4>").html(item.designation);
    const advisory = $("<p>").addClass("mb-0").html(`<b>Advisory: </b> ${item.advisory}`);
    const sections = $("<p>").addClass("mb-0").html(`<b>Sections: </b> ${item.sections}`);
    const ancillary = $("<p>").addClass("mb-0").html(`<b>Ancillary: </b> ${item.ancillary}`);

    details.append(nameHeading, designationParagraph, advisory, sections, ancillary);

    row.append(img, details);
    slideDiv.append(row);

    // Append the slide to the Owl Carousel
    owlCarousel.trigger("add.owl.carousel", [slideDiv]);
  });

  // Refresh the Owl Carousel to display the new slides
  owlCarousel.trigger("refresh.owl.carousel");
}

function displayAnnouncementSlides(announcements) {
  const owlCarousel = $(".announcement-carousel");

  // Loop through each item in the JSON data
  announcements.forEach((item) => {
    console.log(item);
    // Create the slide div element for the announcement item
    const slideDiv = $("<div>").addClass("announcement-item text-center");

    // Create the teacher-text div element
    const announcementDiv = $("<div>").addClass(
      "announcement-text bg-light text-center p-4"
    );

    const contentParagraph = $("<p>").addClass("mb-1").html(item.content);
    const date = $("<small>")
      .addClass("text-center")
      .text(
        "Posted on: " +
          dayjs(item.date_posted, "MM-DD-YYYY").format("MMMM D, YYYY")
      );

    const line = $("<div>").addClass("mb-4");
    let link = null;
    if (item.link) {
      link = $("<a>")
        .addClass("mt-3 italic")
        .attr("href", item.link)
        .attr("target", "_blank")
        .text("Click Here to view details");
    }

    announcementDiv.append(contentParagraph, date, line, link);
    slideDiv.append(announcementDiv);

    // Append the slide to the Owl Carousel
    owlCarousel.trigger("add.owl.carousel", [slideDiv]);
  });

  // Refresh the Owl Carousel to display the new slides
  owlCarousel.trigger("refresh.owl.carousel");
}

function displayMenus(menus) {
  const navBar = $(".navbar-nav");

  menus.forEach((menu, key) => {
    let menuLink = null;
    let navBarDropdown = null;
    if (!menus[key].sub_menu) {
      menuLink = $("<a>")
        .addClass("nav-item nav-link")
        .attr("href", menus[key].link)
        .attr("target", "_blank")
        .text(menus[key].label);
    } else {
      navBarDropdown = $("<div>").addClass("nav-item dropdown");

      const childMenuLink = $("<a>")
        .addClass("nav-link dropdown-toggle")
        .attr("href", menus[key].link)
        .attr("data-bs-toggle", "dropdown")
        .text(menus[key].label);

      const subMenuDiv = $("<div>").addClass("dropdown-menu fade-down m-0");

      menus[key].sub_menu.forEach((subMenuItem, subMenuKey) => {
        const subMenuLink = $("<a>")
          .addClass("dropdown-item")
          .attr("href", subMenuItem.link)
          .attr("target", "_blank")
          .text(subMenuItem.label);
        subMenuDiv.append(subMenuLink);
      });

      navBarDropdown.append(childMenuLink, subMenuDiv);
    }

    navBar.append(menuLink, navBarDropdown);
  });
}
