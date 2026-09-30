#!/bin/bash
set -e
cd /Users/andyyangmacbook/Desktop/homework6/dashboard/libs

echo "下载 jquery-3.7.1.min.js ..."
curl -fsSL -o jquery-3.7.1.min.js https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js

echo "下载 echarts.min.js ..."
curl -fsSL -o echarts.min.js https://cdn.jsdelivr.net/npm/echarts@5.5.0/dist/echarts.min.js

echo "下载 chart.umd.js ..."
curl -fsSL -o chart.umd.js https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.js

echo "下载 bootstrap.bundle.min.js ..."
curl -fsSL -o bootstrap.bundle.min.js https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js

echo "下载 bootstrap.min.css ..."
curl -fsSL -o bootstrap.min.css https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css

echo ""
echo "下载完成。文件大小："
ls -lh