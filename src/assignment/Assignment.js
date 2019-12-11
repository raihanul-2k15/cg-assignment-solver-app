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
import MathJax from "react-mathjax2";
import doMath from "./assignment-maths";
import { vec3ToTex, mat4ToTex, vec4ToTex } from "./utils";

function renderQuestion(q) {
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
      <Typo>Calculation:</Typo>
      <MathJax.Node>
        {`
          \\begin{array}{l c l}
            x = (${x.f}+${x.s})_{16} = ${x.base10}_{10} & ; & x = ${x.base10} mod 6 = ${x.val}\\\\
            y = (${y.f}+${z.s})_{16} = ${y.base10}_{10} & ; & y = ${y.base10} mod 6 = ${y.val}\\\\
            z = (${z.f}+${x.s})_{16} = ${z.base10}_{10} & ; & z = ${z.base10} mod 6 = ${z.val}
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
      <Typo>Points: </Typo>
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

function renderAnswer1(a) {
  const { P, P0, N, Vapprox, U, V, n, u, v, R, T, RT, Pv, P_4, Pv_4 } = a;

  return (
    <div style={{ width: "100%" }}>
      <Typo>Given:</Typo>
      <MathJax.Node>
        {`
          P = ${vec3ToTex(P)}; P_0 = ${vec3ToTex(P0)}; V_{approx} = ${vec3ToTex(
          Vapprox
        )}
        `}
      </MathJax.Node>
      <Typo>Now:</Typo>
      <MathJax.Node>
        {`
          N = P_0 - P = ${vec3ToTex(P0)} - ${vec3ToTex(P)} = ${vec3ToTex(N)}
      `}
      </MathJax.Node>
      <MathJax.Node>{`
        U = V_{approx} \\times N = ${vec3ToTex(Vapprox)} \\times ${vec3ToTex(
        N
      )} = ${vec3ToTex(U)}  
      `}</MathJax.Node>
      <MathJax.Node>{`
        V = N \\times U = ${vec3ToTex(N)} \\times ${vec3ToTex(U)} = ${vec3ToTex(
        V
      )}  
      `}</MathJax.Node>
      <Typo>Translation Matrix: </Typo>
      <MathJax.Node>
        {`
          T = ${mat4ToTex(T)}
        `}
      </MathJax.Node>
      <Typo>Composite Rotation Matrix: </Typo>
      <MathJax.Node>
        {`
          R = ${mat4ToTex(R)}
        `}
      </MathJax.Node>
      <Typo>Transformation Matrix: </Typo>
      <MathJax.Node>
        {`
          RT = ${mat4ToTex(R)} ${mat4ToTex(T)} = ${mat4ToTex(RT)}
        `}
      </MathJax.Node>
      <Typo>Transformed P in VCS: </Typo>
      <MathJax.Node>
        {`
          P_v = RTP = ${mat4ToTex(RT)} ${vec4ToTex(P_4)} = ${vec4ToTex(Pv_4)}
        `}
      </MathJax.Node>
      <Typo>Answer: </Typo>
      <MathJax.Node>
        {`
          P_v = ${vec3ToTex(Pv)}
        `}
      </MathJax.Node>
    </div>
  );
}

function renderAnswer2(a) {
  return (
    <div style={{ width: "100%" }}>
      <Typo variant="h4">Bhai eto bhallagena :(</Typo>
    </div>
  );
}

function Assignment({ roll }) {
  const [solution, setSolution] = React.useState(null);
  if (solution === null) {
    setTimeout(() => {
      setSolution(doMath(roll));
    }, 1000);
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
  const { question, answer1 } = solution;
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
                {renderQuestion(question)}
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typo variant="h5">Answer 1</Typo>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                {renderAnswer1(answer1)}
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typo variant="h5">Answer 2</Typo>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>{renderAnswer2()}</ExpansionPanelDetails>
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
