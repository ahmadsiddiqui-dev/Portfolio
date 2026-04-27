import { Component } from 'react';

// Wraps the 3D model so any error inside three.js / drei / GLTFLoader can't
// take down the whole About page. iOS Safari is the most likely culprit:
// strict WASM MIME enforcement, WebGL context limits, or low-power GPU
// hints can each cause the canvas tree to throw during mount. This boundary
// swallows that and renders `fallback` instead.
export default class Hobby3DBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.warn('[Hobby3D] render failed; rendering fallback', error, info);
  }
  render() {
    if (this.state.hasError) return this.props.fallback || null;
    return this.props.children;
  }
}
