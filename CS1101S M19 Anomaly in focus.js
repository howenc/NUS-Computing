// Q1

function red_rectangle_stream(s) {
    function rectangles(arr) {
        function top_row() {
            for (let i = 0; i < HEIGHT; i = i + 1) {
                for (let j = 0; j < WIDTH; j = j + 1) {
                    if (arr[i][j][1] === 0 && arr[i][j][2] === 0 && arr[i][j][0] > 0) {
                        return i;
                    }
                }
            }
        }
        function bottom_row() {
            for (let i = HEIGHT-1; i > 0; i = i - 1) {
                for (let j = WIDTH-1; j > 0; j = j - 1) {
                    if (arr[i][j][1] === 0 && arr[i][j][2] === 0 && arr[i][j][0] > 0) {
                        return i;
                    }
                }
            }
        }
        function first_column() {
            for (let j = 0; j < WIDTH; j = j + 1) {
                for (let i = 0; i < HEIGHT; i = i + 1) {
                    if (arr[i][j][1] === 0 && arr[i][j][2] === 0 && arr[i][j][0] > 0) {
                        return j;
                    }
                }
            }
        }
        function last_column() {
            for (let j = WIDTH-1; j > 0; j = j - 1) {
                for (let i = HEIGHT-1; i > 0; i = i - 1) {
                    if (arr[i][j][1] === 0 && arr[i][j][2] === 0 && arr[i][j][0] > 0) {
                        return j;
                    }
                }
            }
        }
        return pair(pair(top_row(),first_column()), pair(bottom_row(),last_column()));
    }
    return stream_map(rectangles,s);
}



head(red_rectangle_stream(anomaly_stream));
// should evaluate to: [[141, 191], [159, 209]]

// Q2

function trim(image, rectangle) {
    const trimmed = [];
    const i_min = head(head(rectangle));
    const j_min = tail(head(rectangle));
    const i_max = head(tail(rectangle));
    const j_max = tail(tail(rectangle));

    for (let i = i_min; i <= i_max; i = i + 1) {
        const new_i = i - i_min;
        trimmed[new_i] = [];
        for (let j = j_min; j <= j_max; j = j + 1) {
            const new_j = j - j_min;
            trimmed[new_i][new_j] = image[i][j];
        }
    }
    return trimmed;
}

const focused_stream = stream_combine(
                           trim,
                           anomaly_stream,
                           red_rectangle_stream(anomaly_stream));

