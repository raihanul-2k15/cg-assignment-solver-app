export function round(value) {
  return typeof value === "string" ? value : Math.round(value * 1000) / 1000;
}

export const mat4ToTex = m_gl => {
  let m = [];
  for (let i = 0; i < 16; i++) {
    m.push(round(m_gl[i], 3));
  }
  return `
    \\begin{bmatrix}
    ${m[0]} & ${m[4]} & ${m[8]} & ${m[12]} \\\\
    ${m[1]} & ${m[5]} & ${m[9]} & ${m[13]} \\\\
    ${m[2]} & ${m[6]} & ${m[10]} & ${m[14]} \\\\
    ${m[3]} & ${m[7]} & ${m[11]} & ${m[15]}
    \\end{bmatrix}
  `;
};

export const vec3ToTex = v_gl => {
  let v = [];
  for (let i = 0; i < 3; i++) {
    v.push(round(v_gl[i], 3));
  }
  return `
    \\begin{bmatrix}
    ${v[0]} \\\\
    ${v[1]} \\\\
    ${v[2]}
    \\end{bmatrix}
  `;
};

export const vec4ToTex = v_gl => {
  let v = [];
  for (let i = 0; i < 4; i++) {
    v.push(round(v_gl[i], 3));
  }
  return `
      \\begin{bmatrix}
      ${v[0]} \\\\
      ${v[1]} \\\\
      ${v[2]} \\\\
      ${v[3]}
      \\end{bmatrix}
    `;
};
