import React from "react";
import Typo from "@material-ui/core/Typography";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FacebookIcon from "@material-ui/icons/Facebook";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import { Link } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import MathJax from "react-mathjax2";
import doMath from "./assignment-maths";
import { vec3ToTex, mat4ToTex, vec4ToTex, round } from "./utils";

const useStyles = makeStyles(theme => ({
  section: {
    backgroundColor: theme.palette.primary.light,
    color: "white",
    padding: "5px"
  }
}));

function renderQuestion(q, classes) {
  const { evenOrOdd, section, hash, choice, P, P0, Pr } = q;
  const { x, y, z } = P;
  const { x0, y0, z0 } = P0;
  const { xr, yr, zr } = Pr;

  return (
    <div style={{ width: "100%" }}>
      <Typo>MD5 hash: {hash}</Typo> <br />
      <Typo>Roll is {evenOrOdd}</Typo>
      <Typo>
        Hash section: {section} ({choice})
      </Typo>
      <Typo className={classes.section}>Calculation:</Typo>
      <MathJax.Node>
        {`
          \\begin{array}{l c l}
            x = (${x.f}+${x.s})_{16} = ${x.base10}_{10} & ; & x = ${x.base10} mod 6 + 1 = ${x.val}\\\\
            y = (${y.f}+${y.s})_{16} = ${y.base10}_{10} & ; & y = ${y.base10} mod 6 + 1 = ${y.val}\\\\
            z = (${z.f}+${z.s})_{16} = ${z.base10}_{10} & ; & z = ${z.base10} mod 6 + 1 = ${z.val}
          \\end{array}
        `}
      </MathJax.Node>
      <MathJax.Node>
        {`
          \\begin{array}{l|l}
            x_0 = (${x.val} + 1) = ${x0} & x_r = (${x.val} + 1) / 2 = ${xr} \\\\
            y_0 = (${y.val} + 1) = ${y0} & y_r = (${y.val} + 1) / 2 = ${yr} \\\\
            z_0 = (${z.val} + 6) = ${z0} & z_r = (${z.val} - 1) = ${zr}
          \\end{array}
        `}
      </MathJax.Node>
      <Typo className={classes.section}>Points: </Typo>
      <MathJax.Node>
        {`
          \\begin{array}{l}
            P\\begin{bmatrix}${x.val} & ${y.val} & ${z.val}\\end{bmatrix} \\\\
            P_0\\begin{bmatrix}${x0} & ${y0} & ${z0}\\end{bmatrix} \\\\
            P_r\\begin{bmatrix}${xr} & ${yr} & ${zr}\\end{bmatrix} \\\\
          \\end{array}
        `}
      </MathJax.Node>
    </div>
  );
}

function renderAnswer1(a, classes) {
  const {
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
  } = a;

  return (
    <div style={{ width: "100%" }}>
      <Typo className={classes.section}>Given:</Typo>
      <MathJax.Node>
        {`
          P = ${vec3ToTex(P)}; P_0 = ${vec3ToTex(P0)}; P_r = ${vec3ToTex(
          Pr
        )}; V_{approx} = ${vec3ToTex(Vapprox)}
        `}
      </MathJax.Node>
      <Typo className={classes.section}>Now:</Typo>
      <MathJax.Node>
        {`
          N = P_0 - P_r = ${vec3ToTex(P0)} - ${vec3ToTex(Pr)} = ${vec3ToTex(N)}
      `}
      </MathJax.Node>
      <Typo>Note: A x B represents cross product!</Typo>
      <MathJax.Node>
        {`
        U = V_{approx} \\times N = ${vec3ToTex(Vapprox)} \\times ${vec3ToTex(
          N
        )} = ${vec3ToTex(U)}  
      `}
      </MathJax.Node>
      <MathJax.Node>{`
        V = N \\times U = ${vec3ToTex(N)} \\times ${vec3ToTex(U)} = ${vec3ToTex(
        V
      )}  
      `}</MathJax.Node>
      <Typo className={classes.section}>Unit vectors:</Typo>
      <MathJax.Node>
        {`
          \\hat{u} = \\frac{U}{\\begin{Vmatrix}U\\end{Vmatrix}} = ${vec3ToTex(
            u
          )};
          \\hat{v} = \\frac{V}{\\begin{Vmatrix}V\\end{Vmatrix}} = ${vec3ToTex(
            v
          )};
          \\hat{n} = \\frac{N}{\\begin{Vmatrix}N\\end{Vmatrix}} = ${vec3ToTex(
            n
          )}
        `}
      </MathJax.Node>
      <Typo className={classes.section}>Translation Matrix: </Typo>
      <MathJax.Node>
        {`
          T = ${(function() {
            let arr = [...T];
            arr.splice(12, 3, "-{P_0}_x", "-{P_0}_y", "-{P_0}_z");
            return mat4ToTex(arr);
          })()} =${mat4ToTex(T)}
        `}
      </MathJax.Node>
      <Typo className={classes.section}>Composite Rotation Matrix: </Typo>
      <MathJax.Node>
        {`
          R = ${(function() {
            let arr = [...R];
            arr.splice(0, 3, "u_x", "v_x", "n_x");
            arr.splice(4, 3, "u_y", "v_y", "n_y");
            arr.splice(8, 3, "u_z", "v_z", "n_z");
            return mat4ToTex(arr);
          })()} = ${mat4ToTex(R)}
        `}
      </MathJax.Node>
      <Typo className={classes.section}>Transformed P in VCS: </Typo>
      <MathJax.Node>
        {`
          P_v = RTP = ${mat4ToTex(R)} ${mat4ToTex(T)}  ${vec4ToTex(P_4)} =
        `}
      </MathJax.Node>
      <MathJax.Node>
        {`
          ${mat4ToTex(R)} ${vec4ToTex(P_4_translated)} = ${vec4ToTex(Pv_4)}
        `}
      </MathJax.Node>
      <Typo className={classes.section}>Answer: </Typo>
      <MathJax.Node>
        {`
          P_v = ${vec3ToTex(Pv)}
        `}
      </MathJax.Node>
    </div>
  );
}

function renderAnswer2(a, classes) {
  const {
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
  } = a;

  return (
    <div style={{ width: "100%" }}>
      <Typo
        variant="h6"
        style={{ backgroundColor: "teal", color: "white", padding: "5px" }}
      >
        Credit goes to hafiz031
      </Typo>
      <Typo className={classes.section}>According to question: </Typo>
      <MathJax.Node>
        {`
          \\begin{array}{c c c c c c r}
          r & = & P_{v_x} + 3 & =&  ${round(Pv_4[0])} + 3 & =&  ${round(
          right
        )} \\\\
          l & = & -0.8 * r & =&  -0.8 * ${round(right)} & =&  ${round(
          left
        )} \\\\
          t & = & P_{v_y} + 2 & =&  ${round(Pv_4[1])} + 2 & =&  ${round(
          top
        )} \\\\
          b & = & -0.6 * t & =&  -0.6 * ${round(top)} & =&  ${round(
          bottom
        )} \\\\
          n & = & P_{v_z} / 2 & =&  ${round(Pv_4[2])} / 2 &  =&  ${round(
          near
        )} \\\\
          f & = & 2 * P_{v_z} + 2& =&  2* ${round(Pv_4[2])} + 2 &  = & ${round(
          far
        )} 
        \\end{array}
        `}
      </MathJax.Node>

      <Typo className={classes.section}>Perspective Projection Matrix: </Typo>
      <MathJax.Node>
        {`
          M =${(function() {
            const mat = [
              "\\frac{2|n|}{r-l}",
              0,
              0,
              0,
              0,
              "\\frac{2|n|}{t-b}",
              0,
              0,
              "\\frac{r+l}{r-l}",
              "\\frac{t+b}{t-b}",
              "\\frac{|n|+|f|}{|n|-|f|}",
              -1,
              0,
              0,
              "\\frac{2|n||f|}{|n|-|f|}",
              0
            ];
            return mat4ToTex(mat);
          })()}= ${mat4ToTex(Mproj)}
        `}
      </MathJax.Node>
      <Typo className={classes.section}>Transformed Point:</Typo>
      <MathJax.Node>
        {`
          P' = MP_v = ${mat4ToTex(Mproj)} ${vec4ToTex(Pv_4)} = ${vec4ToTex(
          Pproj
        )}
        `}
      </MathJax.Node>
      <Typo className={classes.section}>
        Converting Homogeneous to Cartesian:{" "}
      </Typo>
      <Typo>Note: Element wise division by w-coordinate of P'</Typo>
      <MathJax.Node>
        {`
            P_{ndc} = P' / {P'}_w = ${vec4ToTex(Pproj)} / ${round(
          Pproj[3]
        )} = ${vec4ToTex(Pproj_divw)}
        `}
      </MathJax.Node>
      <Typo className={classes.section}>Final answer:</Typo>
      <MathJax.Node>
        {`
              P_{ndc} = ${vec3ToTex(Pproj_divw)}
        `}
      </MathJax.Node>
    </div>
  );
}

function Assignment({ roll }) {
  const classes = useStyles();
  const [solution, setSolution] = React.useState(null);
  if (solution === null) {
    setTimeout(() => {
      setSolution(doMath(roll));
    }, 1200);
    return (
      <div>
        <Paper elevation={5}>
          <MathJax.Context input="tex">
            <MathJax.Node>Please wait</MathJax.Node>
          </MathJax.Context>
        </Paper>
      </div>
    );
  }

  const { question, answer1, answer2 } = solution;
  return (
    <div>
      <Paper elevation={5} style={{ marginBottom: "20px" }}>
        <MathJax.Context input="tex">
          <>
            <Typo variant="h4" component="h6" style={{ margin: "10px" }}>
              Assignment check for {roll}
            </Typo>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typo variant="h5">Question Parameters</Typo>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                {renderQuestion(question, classes)}
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typo variant="h5">Answer 1</Typo>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                {renderAnswer1(answer1, classes)}
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typo variant="h5">Answer 2</Typo>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                {renderAnswer2(answer2, classes)}
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </>
        </MathJax.Context>
      </Paper>
      <div style={{ width: "100%" }}>
        <Typo align="center">
          <Link
            target="_blank"
            href="https://www.facebook.com/raihanul.islam.refat"
          >
            <FacebookIcon
              fontSize="large"
              color="primary"
              style={{ margin: "5px" }}
            />
          </Link>
          <Link target="_blank" href="https://github.com/raihanul-2k15/">
            <GitHubIcon
              fontSize="large"
              color="primary"
              style={{ margin: "5px" }}
            />
          </Link>
          <Link
            target="_blank"
            href="https://www.linkedin.com/in/raihanul-islam-refat-ba09a1195/"
          >
            <LinkedInIcon
              fontSize="large"
              color="primary"
              style={{ margin: "5px" }}
            />
          </Link>
        </Typo>
      </div>
    </div>
  );
}

export default Assignment;
