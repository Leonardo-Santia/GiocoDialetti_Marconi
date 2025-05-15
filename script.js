document.addEventListener("DOMContentLoaded", () => {
  const cities = document.querySelectorAll(".city");
  const pathLine = document.getElementById("path-line");

  // Dynamically extend the height of the path-line based on total cities
  pathLine.style.height = `${cities.length * 180}px`;

  // Position cities dynamically with alternating left/right layout
  cities.forEach((city, index) => {
    city.style.top = `${index * 150 + 150}px`; // Evenly spaced vertically
    if (index % 2 === 0) {
      city.style.left = "55%";
      city.style.right = "auto";
    } else {
      city.style.right = "55%";
      city.style.left = "auto";
    }
  });

  // Use IntersectionObserver for an efficient reveal on scroll
  const observerOptions = {
    threshold: 0.2
  };

  const cityObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  cities.forEach((city) => {
    cityObserver.observe(city);
  });

  // City Button Click: Redirect to corresponding quiz page
  document.querySelectorAll(".city-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const cityName = button.getAttribute("data-city");
      window.location.href = `Sections/${cityName}/index.html`;
    });
  });
});
