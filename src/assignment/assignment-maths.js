import md5 from "md5";

const { mat4, vec3, vec4 } = require("gl-matrix");

function hexMath(f, s) {
  const fint = parseInt(f, 16);
  const sint = parseInt(s, 16);
  let val = fint + sint;
  const base16 = val.toString(16);
  const base10 = val;
  val = (val % 6) + 1;
  return { f, s, base16, base10, val };
}

function doMath(roll) {
  // Question parameters

  roll = +roll;
  const hash = md5(`${roll}`);
  let section = roll % 2 === 0 ? hash.slice(0, 6) : hash.slice(-6);
  const choice = roll % 2 === 0 ? "leftmost" : "rightmost";

  const question = {
    roll,
    hash,
    section,
    choice,
    evenOrOdd: roll % 2 === 0 ? "even" : "odd"
  };
  section = section
    .split("")
    .reverse()
    .join("");

  question.P = {
    x: hexMath(section[0], section[3]),
    y: hexMath(section[1], section[4]),
    z: hexMath(section[2], section[5])
  };
  question.P0 = {
    x0: question.P.x.val + 1,
    y0: question.P.y.val + 1,
    z0: question.P.z.val + 6
  };
  question.Pr = {
    xr: (question.P.x.val + 1) / 2,
    yr: (question.P.y.val + 1) / 2,
    zr: question.P.z.val - 1
  };

  // Answer 1
  const P = vec3.fromValues(
    question.P.x.val,
    question.P.y.val,
    question.P.z.val
  );
  const P0 = vec3.fromValues(question.P0.x0, question.P0.y0, question.P0.z0);
  const Pr = vec3.fromValues(question.Pr.xr, question.Pr.yr, question.Pr.zr);
  const Vapprox = vec3.fromValues(0, 1, 0);

  let N = vec3.create();
  let U = vec3.create();
  let V = vec3.create();
  let n = vec3.create();
  let u = vec3.create();
  let v = vec3.create();

  vec3.sub(N, P0, Pr);
  vec3.cross(U, Vapprox, N);
  vec3.cross(V, N, U);
  vec3.normalize(u, U);
  vec3.normalize(v, V);
  vec3.normalize(n, N);

  let T = mat4.create();
  let negP0 = vec3.create();
  vec3.negate(negP0, P0);
  mat4.translate(T, T, negP0);
  const R = mat4.fromValues(
    u[0],
    v[0],
    n[0],
    0,
    u[1],
    v[1],
    n[1],
    0,
    u[2],
    v[2],
    n[2],
    0,
    0,
    0,
    0,
    1
  );
  let P_4 = vec4.fromValues(P[0], P[1], P[2], 1);
  let P_4_translated = vec4.create();
  let Pv_4 = vec4.create();
  vec4.transformMat4(P_4_translated, P_4, T);
  vec4.transformMat4(Pv_4, P_4_translated, R);
  let Pv = vec3.fromValues(Pv_4[0], Pv_4[1], Pv_4[2]);

  const answer1 = {
    P,
    P0,
    Pr,
    N,
    Vapprox,
    U,
    V,
    n,
    u,
    v,
    R,
    T,
    P_4_translated,
    Pv,
    P_4,
    Pv_4
  };

  // answer 2
  const right = Pv_4[0] + 3;
  const left = -0.8 * right;
  const top = Pv_4[1] + 2;
  const bottom = -0.6 * top;
  const near = Pv_4[2] / 2;
  const far = 2 * Pv_4[2] + 2;

  const absNear = Math.abs(near);
  const absFar = Math.abs(far);

  const Mproj = mat4.fromValues(
    (2 * absNear) / (right - left),
    0,
    0,
    0,
    0,
    (2 * absNear) / (top - bottom),
    0,
    0,
    (right + left) / (right - left),
    (top + bottom) / (top - bottom),
    (absNear + absFar) / (absNear - absFar),
    -1,
    0,
    0,
    (2 * absNear * absFar) / (absNear - absFar),
    0
  );

  const Pproj = vec4.create();
  vec4.transformMat4(Pproj, Pv_4, Mproj);

  const Pproj_divw = vec4.fromValues(
    Pproj[0] / Pproj[3],
    Pproj[1] / Pproj[3],
    Pproj[2] / Pproj[3],
    1
  );

  const answer2 = {
    left,
    right,
    top,
    bottom,
    near,
    far,
    Pv_4,
    Mproj,
    Pproj,
    Pproj_divw
  };

  return { question, answer1, answer2 };
}

export default doMath;
