const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    let width, height, cols, rows, grid, ants = [], cellSize = 5;
    let colors = [];
    let directions = [[0, -1], [1, 0], [0, 1], [-1, 0]];
    let antCount = 1;
    let colorCount = 2;
    let speed = 5;

    function setupCanvas() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      
      // Adjust cell size based on screen width
      cellSize = width < 768 ? (width < 480 ? 6 : 5) : 4;
      
      cols = Math.floor(width / cellSize);
      rows = Math.floor(height / cellSize);
    }

    function generateColors(count) {
      return Array.from({ length: count }, (_, i) =>
        `hsl(${(360 / count) * i}, 100%, 50%)`
      );
    }

    function addAnts(n) {
      for (let i = 0; i < n; i++) {
        ants.push({
          x: Math.floor(cols / 2),
          y: Math.floor(rows / 2),
          dir: 0
        });
      }
    }

    function step() {
      ants.forEach(ant => {
        const x = ant.x;
        const y = ant.y;

        if (!grid[x]) grid[x] = [];
        if (!grid[x][y]) grid[x][y] = 0;

        let colorIndex = grid[x][y];
        grid[x][y] = (colorIndex + 1) % colors.length;

        ctx.fillStyle = colors[grid[x][y]];
        ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);

        ant.dir = (ant.dir + (colorIndex % 2 === 0 ? 1 : -1) + 4) % 4;
        ant.x = (ant.x + directions[ant.dir][0] + cols) % cols;
        ant.y = (ant.y + directions[ant.dir][1] + rows) % rows;
      });
    }

    function updateSettings() {
      const newAntCount = parseInt(document.getElementById('antCount').value);
      const newColorCount = parseInt(document.getElementById('colorCount').value);
      const newSpeed = parseInt(document.getElementById('speed').value);

      if (newAntCount > ants.length) addAnts(newAntCount - ants.length);
      antCount = newAntCount;

      if (newColorCount !== colorCount) {
        colorCount = newColorCount;
        colors = generateColors(colorCount);
      }

      if (speed !== newSpeed) {
        speed = newSpeed;
        clearInterval(window.simLoop);
        window.simLoop = setInterval(step, 1000 / speed);
      }

      // Posun šipky podle délky čísla
      const speedGroup = document.getElementById('speedGroup');
      const input = document.getElementById('speed');
      const rightButton = speedGroup.querySelector('.right-button');
      if (input.value.length >= 3) {
        rightButton.style.marginLeft = "15px";
      } else {
        rightButton.style.marginLeft = "5px";
      }
    }

    function changeValue(id, delta) {
      const input = document.getElementById(id);
      const newValue = Math.max(parseInt(input.min || 0), Math.min(parseInt(input.max || 9999), parseInt(input.value) + delta));
      input.value = newValue;
      updateSettings();
    }

    function init() {
      setupCanvas();
      grid = Array(cols).fill().map(() => Array(rows).fill(0));
      colors = generateColors(colorCount);
      ants = [];
      addAnts(antCount);
      clearInterval(window.simLoop);
      window.simLoop = setInterval(step, 1000 / speed);
    }

    window.addEventListener('resize', () => {
      setupCanvas();
      init(); // Reinitialize on resize to adjust grid size
    });

    init();