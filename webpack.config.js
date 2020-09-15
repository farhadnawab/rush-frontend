// Webpack uses this to work with directories
const path = require('path');

// This is the main configuration object.
// Here you write different options and tell Webpack what to do
module.exports = {

  mode: 'development',
  // Path to your entry point. From this file Webpack will begin his work
  entry: './src/app.js',
  watch: true,
  watchOptions: {
    aggregateTimeout: 300, // Process all changes which happened in this time into one rebuild
    poll: 1000, // Check for changes every second,
    ignored: /node_modules/,
    // ignored: [
    //   '**/*.scss', '/node_modules/'
    // ]
  },
  devtool: 'source-maps',
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    watchContentBase: true,
    hot: true,
    open: true,
    inline: true
  },

  // Path and filename of your result bundle.
  // Webpack will bundle all JavaScript into this file
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  module: {
    rules: [
        {
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
        },
        {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        },
        {
            test: /\.(jpg|jpeg|gif|png|svg|webp)$/,
            use: [
                {
                    loader: "file-loader",
                    options: {
                        outputPath: './images',
                        name: "[name].[ext]",
                    },
                },
            ]
        },
        {
            // Apply rule for fonts files
            test: /\.(woff|woff2|ttf|otf|eot)$/,
            use: [
                {
                    // Using file-loader too
                    loader: "file-loader",
                    options: {
                        outputPath: 'fonts'
                    }
                }
            ]
        },
        {
            test: /\.html$/,
            use: {
                loader: 'html-loader',
            }
        },
    ]
  },
};