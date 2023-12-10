document.getElementById("fileInput").addEventListener("change", handleFile);

let allReports = [];

let countryCrimeCount = {};
let monthCrimeCount = {};

function handleFile(event) {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const content = e.target.result;
      allReports = parseReports(content);

      displayTable(allReports);

      countCrimesByCountry(allReports);

      countCrimesByCountryAndMonth(allReports);

      createTimeline(allReports);

      createNetworkGraph(allReports);
    };

    reader.readAsText(file);
  }
}

function parseReports(content) {
  const reports = [];
  const reportSections = content.split("REPORT\n");

  for (const section of reportSections) {
    if (section.trim() !== "") {
      const report = {};
      const lines = section.trim().split("\n");

      for (const line of lines) {
        const [key, value] = line.split(": ");
        report[key] = value;
      }

      reports.push(report);
    }
  }

  return reports;
}

function displayTable(reports) {
  const tableContainer = document.getElementById("tableContainer");
  tableContainer.innerHTML = ""; // Clear previous content

  if (reports.length > 0) {
    const table = document.createElement("table");

    // Create table header
    const headerRow = table.insertRow();
    for (const key in reports[0]) {
      const th = document.createElement("th");
      th.textContent = key;
      if (key == "DATE") th.style.minWidth = "100px";
      else if (key == "REPORTDESCRIPTION") th.style.minWidth = "600px";
      else th.style.minWidth = "100px";
      headerRow.appendChild(th);
    }

    // Create table rows
    for (const report of reports) {
      const row = table.insertRow();
      for (const key in report) {
        const cell = row.insertCell();
        cell.textContent = report[key];
      }
    }

    tableContainer.appendChild(table);
  } else {
    tableContainer.textContent = "No reports found.";
  }
}

function performSearch() {
  const searchField = document.getElementById("searchField").value;
  const searchText = document.getElementById("searchText").value.toLowerCase();

  const filteredReports = allReports.filter((report) => {
    const fieldValue = report[searchField]
      ? report[searchField].toLowerCase()
      : "";
    return fieldValue.includes(searchText);
  });

  console.log(filteredReports);

  displayTable(filteredReports);
}

function clearSearch() {
  document.getElementById("searchText").value = "";
  displayTable(allReports);
}

function countCrimesByCountry(reports) {
  for (const report of reports) {
    if (!report["PLACES"]) continue;
    const places = report["PLACES"].split(";");
    for (const place of places) {
      const country = place.split("/")[place.split("/").length - 1];
      if (countryCrimeCount[country]) {
        countryCrimeCount[country]++;
      } else {
        countryCrimeCount[country] = 1;
      }
    }
  }

  // Log the country with the most crimes
  const mostCrimeCountry = Object.keys(countryCrimeCount).reduce((a, b) =>
    countryCrimeCount[a] > countryCrimeCount[b] ? a : b
  );
  console.log(`Country with most crimes: ${mostCrimeCountry}`);
  console.log(countryCrimeCount);

  document.getElementById(
    "highestCrimeCountry"
  ).innerText = `Country with Highest Crime Rate: ${mostCrimeCountry}`;
  createBarChart(countryCrimeCount);
}

function createBarChart(data) {
  const container = document.getElementById("barChart");
  const labels = Object.keys(data);
  const values = Object.values(data);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Crime Rate",
        data: values,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Create a bar chart using Chart.js
  const myBarChart = new Chart(container, {
    type: "bar",
    data: chartData,
    options: options,
  });
}

function countCrimesByCountryAndMonth(reports) {
  for (const report of reports) {
    if (!report["DATES"]) continue;
    const dates = report["DATES"].split(";");
    for (const date of dates) {
      let month = date.split("/")[0];
      if (month == "") continue;
      if (month == " ") month = "unknown";
      month = month.trim();
      if (monthCrimeCount[month]) {
        monthCrimeCount[month]++;
      } else {
        monthCrimeCount[month] = 1;
      }
    }
  }
  createMonthBarChart(monthCrimeCount);

  const sortedMonths = Object.keys(monthCrimeCount).sort(
    (a, b) => monthCrimeCount[b] - monthCrimeCount[a]
  );
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const mostCrimeMonth = monthNames[parseInt(sortedMonths[1]) - 1];

  document.getElementById(
    "highestCrimeMonth"
  ).innerHTML = `Month with Highest Crime Rate: ${mostCrimeMonth}`;
}

function createMonthBarChart(data) {
  const container = document.getElementById("monthBarChart");
  const labels = Object.keys(data);
  const values = Object.values(data);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Crime Count",
        data: values,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Create a bar chart for months using Chart.js
  const myBarChart = new Chart(container, {
    type: "bar",
    data: chartData,
    options: options,
  });
}

function createTimeline(reports) {
  const container = document.getElementById("timeline");
  const items = new vis.DataSet(); // Use vis.DataSet to manage items

  for (const report of reports) {
    if (!report["DATES"]) continue;
    const dates = report["DATES"].split(";");
    for (const date of dates) {
      if (!date) continue; // Skip empty dates

      const dateParts = date.split("/");
      if (dateParts.length !== 3) {
        console.error(`Invalid date format: ${date}`);
        continue; // Skip invalid date formats
      }

      const [month, day, year] = dateParts.map((part) => part.trim());
      if (!month || !day || !year) {
        console.error(`Invalid date values: ${date}`);
        continue; // Skip dates with missing values
      }

      const startDate = new Date(`${year}-${month}-${day}`);
      const endDate = new Date(`${year}-${month}-${day}`);
      endDate.setDate(endDate.getDate() + 1); // Add one day to show a range on the timeline

      const itemId = report["ID"];

      // Check if the item with the same ID already exists
      const existingItem = items.get(itemId);

      const tooltipContent = `ID: ${report["ID"]}\nDescription: ${report["REPORTDESCRIPTION"]}\nDates: ${report["DATES"]}\nPlaces: ${report["PLACES"]}`;

      if (existingItem) {
        // Update existing item
        existingItem.start = startDate;
        existingItem.end = endDate;
        existingItem.content = report["ID"];
        existingItem.title = tooltipContent;
        items.update(existingItem);
      } else {
        // Add a new item
        items.add({
          id: itemId,
          content: report["ID"],
          start: startDate,
          end: endDate,
          title: tooltipContent,
        });
      }
    }
  }

  var options = {
    stack: true,
    height: "400px",
  };
  const timeline = new vis.Timeline(container, items, options);
  // Listen for the 'select' event on the timeline
  timeline.on("select", function (properties) {
    const selectedItem = items.get(properties.items[0]);
    displayDetailsInDedicatedDiv(selectedItem);
  });
}

function displayDetailsInDedicatedDiv(selectedItem) {
  const detailsContainer = document.getElementById("detailsContainer");
  detailsContainer.innerHTML = `
        <h3>Details for Item ID: ${selectedItem.id}</h3>
        <p>Description: ${selectedItem.content}</p>
        <p>Dates: ${selectedItem.title.split("\n")[2]}</p>
        <p>Places: ${selectedItem.title.split("\n")[3]}</p>
        <!-- Add more details as needed -->
    `;
}

function createNetworkGraph(reports) {
  const graphContainer = document.getElementById("networkGraph");
  const loadingOverlay = createLoadingOverlay(graphContainer);

  const nodes = new vis.DataSet();
  const edges = new vis.DataSet();

  for (const report of reports) {
    if (!report["PERSONS"] || !report["ORGANIZATIONS"] || !report["PLACES"]) {
      console.warn("Skipping report due to missing required properties.");
      continue;
    }
    const persons = report["PERSONS"].split(";");
    const organizations = report["ORGANIZATIONS"].split(";");
    const places = report["PLACES"].split(";");

    persons.forEach((person) =>
      addNodeIfNotExists(nodes, person.trim(), "persons")
    );
    organizations.forEach((organization) =>
      addNodeIfNotExists(nodes, organization.trim(), "organizations")
    );
    places.forEach((place) =>
      addNodeIfNotExists(nodes, place.trim(), "places")
    );

    // Connect persons to organizations and places
    connectNodes(persons, organizations, edges);
    connectNodes(persons, places, edges);
  }

  const container = document.getElementById("networkGraph");
  const data = {
    nodes: nodes,
    edges: edges,
  };
  const options = {
    physics: {
      stabilization: {
        iterations: 500,
      },
    },
    width: "100%",
    height: "600px",
  };
  const network = new vis.Network(container, data, options);

  network.once("afterDrawing", () => {
    hideLoadingOverlay(loadingOverlay);
  });
}

// Function to create a loading overlay
function createLoadingOverlay(container) {
  const overlay = document.createElement("div");
  overlay.className = "loading-overlay";
  overlay.innerHTML =
    '<div class="loading-spinner"></div><div class="loading-message">Loading...</div>';
  container.appendChild(overlay);
  return overlay;
}

// Function to hide the loading overlay
function hideLoadingOverlay(overlay) {
  overlay.style.display = "none";
}

function addNodeIfNotExists(nodes, nodeId, group) {
  // Check if the node with the same ID already exists
  const existingNode = nodes.get(nodeId);

  if (!existingNode) {
    // Add the new node
    nodes.add({ id: nodeId, label: nodeId, group: group });
  }
}

function connectNodes(fromNodes, toNodes, edges, label) {
  fromNodes.forEach((fromNode) => {
    toNodes.forEach((toNode) => {
      // Connect nodes only if they are not the same
      if (fromNode.trim() !== toNode.trim()) {
        edges.add({
          from: fromNode.trim(),
          to: toNode.trim(),
          label: label,
          arrows: "to",
        });
      }
    });
  });
}
