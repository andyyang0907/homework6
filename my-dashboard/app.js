const state = {
  data: null
};

const loadData = async () => {
  $('#status').text('加载中...').show();
  try {
    const response = await fetch('data/library.json');
    if (!response.ok) {
      throw new Error('HTTP ' + response.status);
    }
    const data = await response.json();
    if (data.series.length === 0) {
      $('#status').text('暂无数据').show();
      return;
    }
    state.data = data;
    $('#sub-title').text(data.title + ' · 数据来源：校园图书馆模拟数据');
    $('#status').hide();

    renderCards(data);
    renderBarChart(data);
    renderLineChart(data);
  } catch (error) {
    $('#status').text('加载失败：' + error.message).show();
  }
};

const renderCards = (data) => {
  const months = data.months;
  data.series.forEach(s => {
    const total = s.counts.reduce((sum, n) => sum + n, 0);
    $('#cards').append(`
      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title h6">${s.category}</h3>
            <p class="card-text fs-4">${total}</p>
            <p class="card-text small text-muted">共${months.length}个月累计借阅</p>
          </div>
        </div>
      </div>
    `);
  });
};

let barChart = null;
const renderBarChart = (data) => {
  if (barChart === null) {
    barChart = echarts.init(document.querySelector('#bar-chart'));
  }

  const categories = data.series.map(s => s.category);

  const totals = data.series.map(s =>
    s.counts.reduce((sum, n) => sum + n, 0)
  );

  barChart.setOption({
    title: {
      text: '各类别累计借阅量',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      data: categories
    },
    yAxis: {
      name: '册'
    },
    series: [{
      name: '累计借阅量',
      type: 'bar',
      data: totals
    }]
  });
};

let lineChart = null;
const renderLineChart = (data) => {
  if (lineChart !== null) {
    lineChart.destroy();
  }

  const monthlyTotals = data.months.map((month, index) => {
    return data.series.reduce((sum, s) => {
      return sum + s.counts[index];
    }, 0);
  });

  const ctx = document.querySelector('#line-chart');

  lineChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.months,
      datasets: [{
        label: '每月总借阅量',
        data: monthlyTotals,
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: '校园图书馆每月总借阅量（单位：册）'
        }
      }
    }
  });
};

$('#cards').on('click', '.card', function () {
  $(this).toggleClass('border-primary shadow');
});

loadData();