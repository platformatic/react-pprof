// WebGL shader source code for flame graph rendering

export const MAIN_VERTEX_SHADER_WEBGL2 = `#version 300 es
  in vec2 a_position;
  in vec4 a_color;

  uniform mat3 u_matrix;

  out vec4 v_color;

  void main() {
    vec3 position = u_matrix * vec3(a_position, 1.0);
    gl_Position = vec4(position.xy, 0.0, 1.0);
    v_color = a_color;
  }
`

export const MAIN_VERTEX_SHADER_WEBGL1 = `
  attribute vec2 a_position;
  attribute vec4 a_color;

  uniform mat3 u_matrix;

  varying vec4 v_color;

  void main() {
    vec3 position = u_matrix * vec3(a_position, 1.0);
    gl_Position = vec4(position.xy, 0.0, 1.0);
    v_color = a_color;
  }
`

export const MAIN_FRAGMENT_SHADER_WEBGL2 = `#version 300 es
  precision mediump float;

  in vec4 v_color;
  out vec4 fragColor;

  void main() {
    fragColor = v_color;
  }
`

export const MAIN_FRAGMENT_SHADER_WEBGL1 = `
  precision mediump float;

  varying vec4 v_color;

  void main() {
    gl_FragColor = v_color;
  }
`

export const TEXT_VERTEX_SHADER_WEBGL2 = `#version 300 es
  in vec2 a_position;
  in vec2 a_texCoord;
  in vec4 a_color;

  uniform mat3 u_matrix;

  out vec2 v_texCoord;
  out vec4 v_color;

  void main() {
    vec3 position = u_matrix * vec3(a_position, 1.0);
    gl_Position = vec4(position.xy, 0.0, 1.0);
    v_texCoord = a_texCoord;
    v_color = a_color;
  }
`

export const TEXT_VERTEX_SHADER_WEBGL1 = `
  attribute vec2 a_position;
  attribute vec2 a_texCoord;
  attribute vec4 a_color;

  uniform mat3 u_matrix;

  varying vec2 v_texCoord;
  varying vec4 v_color;

  void main() {
    vec3 position = u_matrix * vec3(a_position, 1.0);
    gl_Position = vec4(position.xy, 0.0, 1.0);
    v_texCoord = a_texCoord;
    v_color = a_color;
  }
`

export const TEXT_FRAGMENT_SHADER_WEBGL2 = `#version 300 es
  precision highp float;

  in vec2 v_texCoord;
  in vec4 v_color;

  uniform sampler2D u_texture;

  out vec4 fragColor;

  void main() {
    vec4 texColor = texture(u_texture, v_texCoord);
    // Apply alpha test for crisper edges
    if (texColor.a < 0.5) discard;
    fragColor = texColor * v_color;
  }
`

export const TEXT_FRAGMENT_SHADER_WEBGL1 = `
  precision highp float;

  varying vec2 v_texCoord;
  varying vec4 v_color;

  uniform sampler2D u_texture;

  void main() {
    vec4 texColor = texture2D(u_texture, v_texCoord);
    // Apply alpha test for crisper edges
    if (texColor.a < 0.5) discard;
    gl_FragColor = texColor * v_color;
  }
`

// Helper function to get shaders based on WebGL version
export function getMainShaders(isWebGL2: boolean) {
  return {
    vertex: isWebGL2 ? MAIN_VERTEX_SHADER_WEBGL2 : MAIN_VERTEX_SHADER_WEBGL1,
    fragment: isWebGL2 ? MAIN_FRAGMENT_SHADER_WEBGL2 : MAIN_FRAGMENT_SHADER_WEBGL1
  }
}

export function getTextShaders(isWebGL2: boolean) {
  return {
    vertex: isWebGL2 ? TEXT_VERTEX_SHADER_WEBGL2 : TEXT_VERTEX_SHADER_WEBGL1,
    fragment: isWebGL2 ? TEXT_FRAGMENT_SHADER_WEBGL2 : TEXT_FRAGMENT_SHADER_WEBGL1
  }
}
