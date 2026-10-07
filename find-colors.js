const sharp = require('sharp');

async function main() {
  try {
    const input = 'public/images/biofactor-official-logo.png';
    const { data, info } = await sharp(input)
      .raw()
      .toBuffer({ resolveWithObject: true });

    // The logo has 5 capsules. We want to find the unique greens used.
    let colors = new Set();
    for (let i = 0; i < data.length; i += info.channels) {
      let r = data[i];
      let g = data[i + 1];
      let b = data[i + 2];
      let a = info.channels === 4 ? data[i + 3] : 255;
      
      if (a > 100) { // ignore transparent
        // only looking for greens where G is dominant
        if (g > r && g > b) {
            let hex = '#' + [r,g,b].map(x => x.toString(16).padStart(2, '0')).join('');
            colors.add(hex);
        }
      }
    }
    
    // Convert set to array, calculate frequencies to find the main swatches
    let counts = {};
    for (let i = 0; i < data.length; i += info.channels) {
        let r = data[i], g = data[i+1], b = data[i+2], a = info.channels === 4 ? data[i+3] : 255;
        if (a > 200) {
            let hex = '#' + [r,g,b].map(x => x.toString(16).padStart(2, '0')).join('');
            counts[hex] = (counts[hex] || 0) + 1;
        }
    }
    
    let sorted = Object.entries(counts).sort((a,b) => b[1] - a[1]).slice(0, 50);
    console.log("Top 50 colors by pixel count:");
    sorted.forEach(([color, count]) => {
        // filter out grays/whites/blacks
        let r = parseInt(color.slice(1,3), 16);
        let g = parseInt(color.slice(3,5), 16);
        let b = parseInt(color.slice(5,7), 16);
        if (g > r + 10 && g > b + 10) {
           console.log(`${color} Count: ${count}`);
        }
    });

  } catch (err) {
    console.error(err);
  }
}
main();
