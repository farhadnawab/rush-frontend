const CleanWebpackPlugin = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
// We need Nodes fs module to read directory contents
const fs = require('fs');

// Our function that generates our html plugins
function generateHtmlPlugins(templateDir) {
  // Read files in template directory
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
  return templateFiles.map((item) => {
    // Split names and extension
    const parts = item.split('.');
    const name = parts[0];
    const extension = parts[1];
    // Create new HTMLWebpackPlugin with options
    return new HTMLWebpackPlugin({
      filename: `${name}.html`,
      template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
    });
  });
}

// Call our function on our views directory.
const htmlPlugins = generateHtmlPlugins('./src/template/view');

module.exports = function () {
  return {
    mode: 'production',
    entry: [
      './src/app.js',
    ],
    output: {
      path: path.resolve(__dirname, 'docs'),
    },
    optimization: {
      minimizer: [
        new OptimizeCSSAssetsPlugin(),
      ],
    },
    plugins: [
      new CleanWebpackPlugin(['docs']),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
      }),
      new MinifyPlugin(),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, './src/images'),
            to: path.resolve(__dirname, 'docs/images'),
          },
        ],
      }),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, './src/manifest.json'),
            to: path.resolve(__dirname, 'docs/manifest.json'),
          },
        ],
      }),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, './src/serviceWorker.js'),
            to: path.resolve(__dirname, 'docs/serviceWorker.js'),
          },
        ],
      }),
    ]
    // We join our htmlPlugin array to the end
    // of our webpack plugins array.
      .concat(htmlPlugins),
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        {
          test: /\.(jpg|jpeg|gif|png|svg|webp)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: './images',
                name: '[name].[ext]',
              },
            },
            {
              loader: 'image-webpack-loader',
              options: {
                mozjpeg: {
                  progressive: false,
                  quality: 45,
                },
                // optipng.enabled: false will disable optipng
                optipng: {
                  enabled: true,
                },
                pngquant: {
                  quality: '65-90',
                  speed: 4,
                },
                gifsicle: {
                  interlaced: true,
                  optimizationLevel: 3,
                },
                // the webp option will enable WEBP
                webp: {
                  quality: 20,
                },
              },
            },
          ],
        },
        {
          // Apply rule for fonts files
          test: /\.(woff|woff2|ttf|otf|eot)$/,
          use: [
            {
              // Using file-loader too
              loader: 'file-loader',
              options: {
                outputPath: 'fonts',
                name: '[name].[ext]',
              },
            },
          ],
        },
        {
          test: /\.html$/,
          /* include: path.join(__dirname, 'src/template/view'), */
          use: {
            loader: 'html-loader',
            options: {
              interpolate: true,
            },
          },
        },
      ],
    },
  };
};
