window.addEventListener("load", Main_integrate, true);
function Main_integrate() {
  calculate_button.onclick = plot;

  function gamma(m) {
    var rez = 1;

    if (m === 0)
      return 1;

    for (var i = 1; i <= m; i++) {
      rez = rez * i;
    }

    return rez;
  }

  function bessel(x, alpha) {
    var n1 = 0.0;
    var sum1 = 0.0;
    var m1 = 0;
    var n2 = 0.0;
    var sum2 = 0.0;
    var m2 = 0;

    do {
      sum1 += n1;
      n1 = Math.pow(-1, m1) * Math.pow((x/2), (2*m1 + alpha)) / (gamma(m1) * gamma(m1 + alpha));
      m1++;

      do {
        sum2 += n2;
        n2 = Math.pow(-1, m2) * Math.pow((x/2), (2*m2 + alpha)) / (gamma(m2) * gamma(m2 + alpha));
        m2++;
      } while (2 * m1 != m2)

    } while (Math.abs(n1 - n2) > 0.00001)

    return sum1;
  }

  function plot() {
    var
      container = document.getElementById("plotPhi"),
      data = [],
      graph;

    var x = 0.0;
    var dx = 0.001;
    var xMax = 20;
    var alpha = document.getElementById("Alpha").value;
    alpha = +alpha;

    while(x <= xMax) {
      y = bessel(x, alpha);
      data.push([x, y]);
      x += dx;
    }

    graph = Flotr.draw(container, [ data ]);
  }
}

 