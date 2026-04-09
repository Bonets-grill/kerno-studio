import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

// Mock IntersectionObserver
class MockIntersectionObserver {
  constructor(private callback: IntersectionObserverCallback) {}
  observe() {
    // Trigger immediately for tests
    this.callback(
      [{ isIntersecting: true, target: document.createElement('div') }] as unknown as IntersectionObserverEntry[],
      this as unknown as IntersectionObserver
    )
  }
  unobserve() {}
  disconnect() {}
}
globalThis.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver

// Default language to ES for tests
Object.defineProperty(navigator, 'language', { value: 'es', configurable: true })

// Mock scrollIntoView
Element.prototype.scrollIntoView = vi.fn()

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
})

// Mock ResizeObserver
globalThis.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
} as unknown as typeof ResizeObserver

// Mock WebGL for Three.js
HTMLCanvasElement.prototype.getContext = ((origFn) => {
  return function (this: HTMLCanvasElement, type: string, ...args: unknown[]) {
    if (type === 'webgl' || type === 'webgl2') {
      return {
        canvas: this,
        getExtension: () => null,
        getParameter: () => 0,
        createShader: () => ({}),
        shaderSource: () => {},
        compileShader: () => {},
        getShaderParameter: () => true,
        createProgram: () => ({}),
        attachShader: () => {},
        linkProgram: () => {},
        getProgramParameter: () => true,
        useProgram: () => {},
        createBuffer: () => ({}),
        bindBuffer: () => {},
        bufferData: () => {},
        enable: () => {},
        disable: () => {},
        clear: () => {},
        viewport: () => {},
        clearColor: () => {},
        createTexture: () => ({}),
        bindTexture: () => {},
        texImage2D: () => {},
        texParameteri: () => {},
        activeTexture: () => {},
        getUniformLocation: () => ({}),
        getAttribLocation: () => 0,
        enableVertexAttribArray: () => {},
        vertexAttribPointer: () => {},
        drawArrays: () => {},
        uniform1f: () => {},
        uniform1i: () => {},
        uniform2f: () => {},
        uniform3f: () => {},
        uniform4f: () => {},
        uniformMatrix4fv: () => {},
        createFramebuffer: () => ({}),
        bindFramebuffer: () => {},
        framebufferTexture2D: () => {},
        checkFramebufferStatus: () => 36053,
        deleteFramebuffer: () => {},
        deleteTexture: () => {},
        pixelStorei: () => {},
        blendFunc: () => {},
        depthFunc: () => {},
        depthMask: () => {},
        colorMask: () => {},
        scissor: () => {},
        drawElements: () => {},
        createRenderbuffer: () => ({}),
        bindRenderbuffer: () => {},
        renderbufferStorage: () => {},
        framebufferRenderbuffer: () => {},
        getSupportedExtensions: () => [],
        getShaderInfoLog: () => '',
        getProgramInfoLog: () => '',
        isContextLost: () => false,
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (origFn as any).call(this, type, ...args)
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
})(HTMLCanvasElement.prototype.getContext) as any
