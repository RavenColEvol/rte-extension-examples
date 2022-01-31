const path = require('path');
const pkg = require('./package.json');

module.exports = {
    entry: `./src/${pkg.entry}.tsx`,
    externals: {
        react: "react",
        'react-dom': "react-dom",
        '@contentstack/venus-components': '@contentstack/venus-components'
    },
    mode: "production",
    output: {
        filename: pkg.output,
        path: path.resolve(__dirname, "dist"),
        libraryTarget: "system",
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    module: {
        rules: [
            {
                rules: [
                    {
                        test: /\.css$/i,
                        use: ["style-loader", "css-loader"],
                    },
                ],
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader",
                    },
                ],
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader",
            },
        ],
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 1268,
        https: true,
        disableHostCheck: true,
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
    },
};
