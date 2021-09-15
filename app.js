function drawSquareOfColor(x1, x2, y1, y2, color) {
    triangleCoords.push(
        x2, y1,
        x2, y2,
        x1, y1,
        x1, y1,
        x1, y2,
        x2, y2,
    );

    j = -1;
    for (let i = 0; i < 18; i++) {
        j++;
        if (j >= color.length) {
            j = 0;
        }
        vertexColor.push(color[j]);
    }
}

function drawMirroredSquareOfColor(x1, x2, y1, y2, color) {
    triangleCoords.push(
        x2 * -1, y1,
        x2 * -1, y2,
        x1 * -1, y1,
        x1 * -1, y1,
        x1 * -1, y2,
        x2 * -1, y2,
    );

    j = -1;
    for (let i = 0; i < 18; i++) {
        j++;
        if (j >= color.length) {
            j = 0;
        }
        vertexColor.push(color[j]);
    }
}

const canvas = document.getElementById('gl-canvas');
const gl = canvas.getContext('webgl2');

gl.clearColor(0.5, 0.5, 0.5, 1);
gl.clear(gl.COLOR_BUFFER_BIT);

const vertexShader = `#version 300 es
precision mediump float;
in vec2 position;
in vec3 color;
out vec3 vColor;
void main()
{
    gl_Position = vec4(position, 0, 1);
    vColor = color;
}
`;

const fragmentShader = `#version 300 es
precision mediump float;
out vec4 fragColor;
in vec3 vColor;
void main()
{
    fragColor = vec4(vColor, 1);
}
`;

const vs = gl.createShader(gl.VERTEX_SHADER);
const fs = gl.createShader(gl.FRAGMENT_SHADER);

gl.shaderSource(vs, vertexShader);
gl.shaderSource(fs, fragmentShader);

gl.compileShader(vs);
gl.compileShader(fs);

if(!gl.getShaderParameter(vs, gl.COMPILE_STATUS))
{
    console.error(gl.getShaderInfoLog(vs));
}

if(!gl.getShaderParameter(fs, gl.COMPILE_STATUS))
{
    console.error(gl.getShaderInfoLog(fs));
}

const program = gl.createProgram();
gl.attachShader(program, vs);
gl.attachShader(program, fs);
gl.linkProgram(program);

if(!gl.getProgramParameter(program, gl.LINK_STATUS))
{
    console.error(gl.getProgramInfoLog(program));
}

gl.useProgram(program);

const triangleCoords = [];
const vertexColor = [];

const red = [0.7647, 0.047, 0];
const black = [0, 0, 0];
const white = [1, 1, 1];
const lightGrey = [0.6431, 0.6745, 0.733];
const grey = [0.4118, 0.4431, 0.4902];
const darkGrey = [0.2667, 0.2667, 0.2667];
const darkerGrey = [0.149, 0.149, 0.149];

/// Inner mask
drawSquareOfColor(-0.25, 0, 0.65, 0.75, darkGrey);
drawSquareOfColor(-0.45, -0.15, 0.6, 0.7, darkGrey);
drawSquareOfColor(-0.5, -0.35, 0.5, 0.65, darkGrey);
drawSquareOfColor(-0.4, 0, -0.4, 0.8, darkGrey);
drawSquareOfColor(-0.45, -0.4, -0.25, 0.6, darkGrey);
drawSquareOfColor(-0.5, -0.45, -0.1, 0.5, darkGrey);
drawSquareOfColor(-0.55, -0.5, 0, 0.45, darkGrey);
drawSquareOfColor(-0.6, -0.55, 0.1, 0.3, darkGrey);

/// White part
drawSquareOfColor(-0.2, 0, -0.8, 0.5, white);
drawSquareOfColor(-0.3, -0.2, -0.1, 0.55, white);
drawSquareOfColor(-0.35, -0.3, 0.05, 0.45, white);

/// White part shades
drawSquareOfColor(-0.25, 0, 0.5, 0.6, lightGrey);
drawSquareOfColor(-0.3, -0.15, 0.45, 0.5, lightGrey);
drawSquareOfColor(-0.3, -0.25, 0.4, 0.45, lightGrey);
drawSquareOfColor(-0.35, -0.3, 0.35, 0.4, lightGrey);
drawSquareOfColor(-0.2, -0.15, 0.35, 0.4, lightGrey);
drawSquareOfColor(-0.15, -0.1, 0.25, 0.3, lightGrey);
drawSquareOfColor(-0.15, -0.1, 0.2, 0.25, grey);
drawSquareOfColor(-0.3, -0.25, 0.2, 0.25, lightGrey);
drawSquareOfColor(-0.15, -0.1, 0.1, 0.2, lightGrey);

drawSquareOfColor(-0.35, -0.3, 0.05, 0.1, lightGrey);
drawSquareOfColor(-0.3, -0.25, -0.05, 0, lightGrey);
drawSquareOfColor(-0.2, -0.15, -0.05, 0, lightGrey);
drawSquareOfColor(-0.25, -0.2, -0.1, -0.05, lightGrey);
drawSquareOfColor(-0.2, -0.15, -0.25, -0.2, lightGrey);

drawSquareOfColor(-0.15, -0.1, -0.65, -0.6, lightGrey);
drawSquareOfColor(-0.15, 0, -0.7, -0.65, lightGrey);
drawSquareOfColor(-0.1, 0, -0.75, -0.7, lightGrey);

/// White part dark shading
drawSquareOfColor(-0.15, -0.1, 0.55, 0.65, grey);
drawSquareOfColor(-0.25, -0.2, 0.5, 0.6, grey);
drawSquareOfColor(-0.3, -0.25, 0.45, 0.5, grey);

drawSquareOfColor(-0.1, 0, -0.8, -0.75, grey);

// Eyes
drawSquareOfColor(-0.3, -0.2, 0.25, 0.4, black);
drawSquareOfColor(-0.2, -0.15, 0.2, 0.35, black);
drawSquareOfColor(-0.25, -0.2, 0.2, 0.25, black);

/// Inner black outline - Top -> Bottom
drawSquareOfColor(-0.15, 0, 0.6, 0.65, black);
drawSquareOfColor(-0.25, -0.15, 0.55, 0.6, black);
drawSquareOfColor(-0.3, -0.25, 0.5, 0.55, black);
drawSquareOfColor(-0.35, -0.3, 0.4, 0.5, black);
drawSquareOfColor(-0.4, -0.35, 0.05, 0.4, black);
drawSquareOfColor(-0.35, -0.3, -0.05, 0.05, black);
drawSquareOfColor(-0.3, -0.25, -0.1, -0.05, black);
drawSquareOfColor(-0.25, -0.2, -0.25, -0.1, black);
drawSquareOfColor(-0.35, -0.25, -0.25, -0.2, black);
drawSquareOfColor(-0.45, -0.35, -0.2, -0.15, black);
drawSquareOfColor(-0.45, -0.35, -0.2, -0.15, black);
drawSquareOfColor(-0.2, -0.15, -0.5, -0.25, black);

/// Outer mask
// Upper half - Bottom -> Top
drawSquareOfColor(-0.7, -0.6, 0.1, 0.3, black);
drawSquareOfColor(-0.65, -0.55, 0.3, 0.5, black);
drawSquareOfColor(-0.6, -0.5, 0.5, 0.6, black);
drawSquareOfColor(-0.55, -0.45, 0.6, 0.65, black);
drawSquareOfColor(-0.5, -0.4, 0.65, 0.7, black);
drawSquareOfColor(-0.45, -0.35, 0.7, 0.75, black);
drawSquareOfColor(-0.4, -0.2, 0.7, 0.8, black);
drawSquareOfColor(-0.25, 0, 0.75, 0.85, black);

// Lower half - Top -> Bottom
drawSquareOfColor(-0.65, -0.55, 0, 0.1, black);
drawSquareOfColor(-0.6, -0.5, -0.05, 0, black);
drawSquareOfColor(-0.55, -0.45, -0.25, -0.05, black);
drawSquareOfColor(-0.5, -0.4, -0.35, -0.25, black);
drawSquareOfColor(-0.45, -0.35, -0.4, -0.35, black);
drawSquareOfColor(-0.4, -0.2, -0.45, -0.4, black);
drawSquareOfColor(-0.35, -0.2, -0.5, -0.45, black);
drawSquareOfColor(-0.25, -0.15, -0.7, -0.5, black);
drawSquareOfColor(-0.25, -0.15, -0.7, -0.5, black);
drawSquareOfColor(-0.2, -0.1, -0.8, -0.7, black);
drawSquareOfColor(-0.15, 0, -0.85, -0.8, black);
drawSquareOfColor(-0.05, 0, -0.9, -0.85, black);

/// Inner mask "Shades" - Top -> Bottom
drawSquareOfColor(-0.25, -0.2, 0.7, 0.75, darkerGrey);
drawSquareOfColor(-0.4, -0.35, 0.65, 0.7, darkerGrey);
drawSquareOfColor(-0.45, -0.4, 0.6, 0.65, darkerGrey);
drawSquareOfColor(-0.5, -0.45, 0.55, 0.6, darkerGrey);
drawSquareOfColor(-0.55, -0.5, 0.45, 0.5, darkerGrey);
drawSquareOfColor(-0.6, -0.55, 0.25, 0.3, darkerGrey);
drawSquareOfColor(-0.6, -0.55, 0.1, 0.15, darkerGrey);
drawSquareOfColor(-0.55, -0.5, 0, 0.05, darkerGrey);

drawSquareOfColor(-0.2, -0.15, 0.6, 0.65, darkerGrey);
drawSquareOfColor(-0.3, -0.25, 0.55, 0.6, darkerGrey);
drawSquareOfColor(-0.35, -0.3, 0.5, 0.55, darkerGrey);
drawSquareOfColor(-0.4, -0.35, 0.4, 0.45, darkerGrey);
drawSquareOfColor(-0.4, -0.35, 0, 0.05, darkerGrey);
drawSquareOfColor(-0.45, -0.3, -0.15, -0.05, darkerGrey);
drawSquareOfColor(-0.3, -0.25, -0.15, -0.1, darkerGrey);
drawSquareOfColor(-0.35, -0.25, -0.2, -0.15, darkerGrey);

drawSquareOfColor(-0.45, -0.35, -0.25, -0.2, darkerGrey);
drawSquareOfColor(-0.4, -0.2, -0.3, -0.25, darkerGrey);


/// MIRROR EVERYTHING
/// Inner mask
drawMirroredSquareOfColor(-0.25, 0, 0.65, 0.75, darkGrey);
drawMirroredSquareOfColor(-0.45, -0.15, 0.6, 0.7, darkGrey);
drawMirroredSquareOfColor(-0.5, -0.35, 0.5, 0.65, darkGrey);
drawMirroredSquareOfColor(-0.4, 0, -0.4, 0.8, darkGrey);
drawMirroredSquareOfColor(-0.45, -0.4, -0.25, 0.6, darkGrey);
drawMirroredSquareOfColor(-0.5, -0.45, -0.1, 0.5, darkGrey);
drawMirroredSquareOfColor(-0.55, -0.5, 0, 0.45, darkGrey);
drawMirroredSquareOfColor(-0.6, -0.55, 0.1, 0.3, darkGrey);

/// White part
drawMirroredSquareOfColor(-0.2, 0, -0.8, 0.5, white);
drawMirroredSquareOfColor(-0.3, -0.2, -0.1, 0.55, white);
drawMirroredSquareOfColor(-0.35, -0.3, 0.05, 0.45, white);

/// White part shades
drawMirroredSquareOfColor(-0.25, 0, 0.5, 0.6, lightGrey);
drawMirroredSquareOfColor(-0.3, -0.15, 0.45, 0.5, lightGrey);
drawMirroredSquareOfColor(-0.3, -0.25, 0.4, 0.45, lightGrey);
drawMirroredSquareOfColor(-0.35, -0.3, 0.35, 0.4, lightGrey);
drawMirroredSquareOfColor(-0.2, -0.15, 0.35, 0.4, lightGrey);
drawMirroredSquareOfColor(-0.15, -0.1, 0.25, 0.3, lightGrey);
drawMirroredSquareOfColor(-0.15, -0.1, 0.2, 0.25, grey);
drawMirroredSquareOfColor(-0.3, -0.25, 0.2, 0.25, lightGrey);
drawMirroredSquareOfColor(-0.15, -0.1, 0.1, 0.2, lightGrey);

drawMirroredSquareOfColor(-0.35, -0.3, 0.05, 0.1, lightGrey);
drawMirroredSquareOfColor(-0.3, -0.25, -0.05, 0, lightGrey);
drawMirroredSquareOfColor(-0.2, -0.15, -0.05, 0, lightGrey);
drawMirroredSquareOfColor(-0.25, -0.2, -0.1, -0.05, lightGrey);
drawMirroredSquareOfColor(-0.2, -0.15, -0.25, -0.2, lightGrey);

drawMirroredSquareOfColor(-0.15, -0.1, -0.65, -0.6, lightGrey);
drawMirroredSquareOfColor(-0.15, 0, -0.7, -0.65, lightGrey);
drawMirroredSquareOfColor(-0.1, 0, -0.75, -0.7, lightGrey);

/// White part dark shading
drawMirroredSquareOfColor(-0.15, -0.1, 0.55, 0.65, grey);
drawMirroredSquareOfColor(-0.25, -0.2, 0.5, 0.6, grey);
drawMirroredSquareOfColor(-0.3, -0.25, 0.45, 0.5, grey);

drawMirroredSquareOfColor(-0.1, 0, -0.8, -0.75, grey);

// Eyes
drawMirroredSquareOfColor(-0.3, -0.2, 0.25, 0.4, black);
drawMirroredSquareOfColor(-0.2, -0.15, 0.2, 0.35, black);
drawMirroredSquareOfColor(-0.25, -0.2, 0.2, 0.25, black);

/// Inner black outline - Top -> Bottom
drawMirroredSquareOfColor(-0.15, 0, 0.6, 0.65, black);
drawMirroredSquareOfColor(-0.25, -0.15, 0.55, 0.6, black);
drawMirroredSquareOfColor(-0.3, -0.25, 0.5, 0.55, black);
drawMirroredSquareOfColor(-0.35, -0.3, 0.4, 0.5, black);
drawMirroredSquareOfColor(-0.4, -0.35, 0.05, 0.4, black);
drawMirroredSquareOfColor(-0.35, -0.3, -0.05, 0.05, black);
drawMirroredSquareOfColor(-0.3, -0.25, -0.1, -0.05, black);
drawMirroredSquareOfColor(-0.25, -0.2, -0.25, -0.1, black);
drawMirroredSquareOfColor(-0.35, -0.25, -0.25, -0.2, black);
drawMirroredSquareOfColor(-0.45, -0.35, -0.2, -0.15, black);
drawMirroredSquareOfColor(-0.45, -0.35, -0.2, -0.15, black);
drawMirroredSquareOfColor(-0.2, -0.15, -0.5, -0.25, black);

/// Outer mask
// Upper half - Bottom -> Top
drawMirroredSquareOfColor(-0.7, -0.6, 0.1, 0.3, black);
drawMirroredSquareOfColor(-0.65, -0.55, 0.3, 0.5, black);
drawMirroredSquareOfColor(-0.6, -0.5, 0.5, 0.6, black);
drawMirroredSquareOfColor(-0.55, -0.45, 0.6, 0.65, black);
drawMirroredSquareOfColor(-0.5, -0.4, 0.65, 0.7, black);
drawMirroredSquareOfColor(-0.45, -0.35, 0.7, 0.75, black);
drawMirroredSquareOfColor(-0.4, -0.2, 0.7, 0.8, black);
drawMirroredSquareOfColor(-0.25, 0, 0.75, 0.85, black);

// Lower half - Top -> Bottom
drawMirroredSquareOfColor(-0.65, -0.55, 0, 0.1, black);
drawMirroredSquareOfColor(-0.6, -0.5, -0.05, 0, black);
drawMirroredSquareOfColor(-0.55, -0.45, -0.25, -0.05, black);
drawMirroredSquareOfColor(-0.5, -0.4, -0.35, -0.25, black);
drawMirroredSquareOfColor(-0.45, -0.35, -0.4, -0.35, black);
drawMirroredSquareOfColor(-0.4, -0.2, -0.45, -0.4, black);
drawMirroredSquareOfColor(-0.35, -0.2, -0.5, -0.45, black);
drawMirroredSquareOfColor(-0.25, -0.15, -0.7, -0.5, black);
drawMirroredSquareOfColor(-0.25, -0.15, -0.7, -0.5, black);
drawMirroredSquareOfColor(-0.2, -0.1, -0.8, -0.7, black);
drawMirroredSquareOfColor(-0.15, 0, -0.85, -0.8, black);
drawMirroredSquareOfColor(-0.05, 0, -0.9, -0.85, black);

/// Inner mask "Shades" - Top -> Bottom
drawMirroredSquareOfColor(-0.25, -0.2, 0.7, 0.75, darkerGrey);
drawMirroredSquareOfColor(-0.4, -0.35, 0.65, 0.7, darkerGrey);
drawMirroredSquareOfColor(-0.45, -0.4, 0.6, 0.65, darkerGrey);
drawMirroredSquareOfColor(-0.5, -0.45, 0.55, 0.6, darkerGrey);
drawMirroredSquareOfColor(-0.55, -0.5, 0.45, 0.5, darkerGrey);
drawMirroredSquareOfColor(-0.6, -0.55, 0.25, 0.3, darkerGrey);
drawMirroredSquareOfColor(-0.6, -0.55, 0.1, 0.15, darkerGrey);
drawMirroredSquareOfColor(-0.55, -0.5, 0, 0.05, darkerGrey);

drawMirroredSquareOfColor(-0.2, -0.15, 0.6, 0.65, darkerGrey);
drawMirroredSquareOfColor(-0.3, -0.25, 0.55, 0.6, darkerGrey);
drawMirroredSquareOfColor(-0.35, -0.3, 0.5, 0.55, darkerGrey);
drawMirroredSquareOfColor(-0.4, -0.35, 0.4, 0.45, darkerGrey);
drawMirroredSquareOfColor(-0.4, -0.35, 0, 0.05, darkerGrey);
drawMirroredSquareOfColor(-0.45, -0.3, -0.15, -0.05, darkerGrey);
drawMirroredSquareOfColor(-0.3, -0.25, -0.15, -0.1, darkerGrey);
drawMirroredSquareOfColor(-0.35, -0.25, -0.2, -0.15, darkerGrey);

drawMirroredSquareOfColor(-0.45, -0.35, -0.25, -0.2, darkerGrey);
drawMirroredSquareOfColor(-0.4, -0.2, -0.3, -0.25, darkerGrey);

const positionBuffer = gl.createBuffer();
const colorBuffer = gl.createBuffer();

gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleCoords), gl.STATIC_DRAW);

const attribPosition = gl.getAttribLocation(program, 'position');
gl.enableVertexAttribArray(attribPosition);
gl.vertexAttribPointer(attribPosition, 2, gl.FLOAT, gl.FALSE, 0, 0);

gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexColor), gl.STATIC_DRAW);

const color = gl.getAttribLocation(program, 'color');
gl.enableVertexAttribArray(color);
gl.vertexAttribPointer(color, 3, gl.FLOAT, gl.FALSE, 0, 0);

gl.drawArrays(gl.TRIANGLES, 0, 1050);