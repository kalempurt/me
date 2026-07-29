function getTextNodes(root: Node): Text[] {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  const nodes: Text[] = []
  let node: Text | null
  while ((node = walker.nextNode() as Text | null)) {
    if (node.textContent!.trim()) nodes.push(node)
  }
  return nodes
}

function nodePath(container: Node, node: Node): string {
  const segs: number[] = []
  let cur: Node | null = node
  while (cur && cur !== container) {
    const p: ParentNode | null = cur.parentNode
    if (p) {
      for (let i = 0; i < p.childNodes.length; i++) {
        if (p.childNodes[i] === cur) { segs.unshift(i); break }
      }
    }
    cur = p
  }
  return segs.join('.')
}

const SYMS = '!@#$%^&*()_+-=[]{}|;:,.<>?/~'

function randSym(): string {
  return SYMS[Math.floor(Math.random() * SYMS.length)]
}

export function scramble(node: Text, target: string, frames: number, done: () => void) {
  let frame = 0
  const len = target.length
  function tick() {
    const revealed = Math.floor((frame / frames) * len)
    let out = ''
    for (let i = 0; i < len; i++) {
      out += i < revealed ? target[i] : randSym()
    }
    node.textContent = out
    frame++
    if (frame <= frames) { requestAnimationFrame(tick); return }
    node.textContent = target
    done()
  }
  tick()
}

export function useScrambleSwitch() {
  function play(container: HTMLElement, onSwitch: (next: () => void) => void, onDone?: () => void) {
    const nodes = getTextNodes(container)
    const items = nodes.map(n => ({ node: n, text: n.textContent || '', path: nodePath(container, n) }))

    const frozenParents = new Map<HTMLElement, string>()
    for (const item of items) {
      const p = item.node.parentElement
      if (p && !frozenParents.has(p) && p.offsetHeight > 0) {
        frozenParents.set(p, p.style.minHeight)
        p.style.minHeight = p.offsetHeight + 'px'
      }
    }
    const containerOrig = container.style.minHeight
    if (container.offsetHeight > 0) container.style.minHeight = container.offsetHeight + 'px'
    const unfreeze = () => {
      frozenParents.forEach((orig, el) => { el.style.minHeight = orig })
      container.style.minHeight = containerOrig
    }

    const oldByPath = new Map<string, string>()
    for (const item of items) oldByPath.set(item.path, item.text)

    onSwitch(() => {
      requestAnimationFrame(() => requestAnimationFrame(() => {
        const fresh = getTextNodes(container)
        const freshItems = fresh.map(n => ({ node: n, text: n.textContent || '', path: nodePath(container, n) }))

        let running = 0

        function oneDone() {
          running--
          if (running > 0) return
          unfreeze()
          onDone?.()
        }

        for (const fi of freshItems) {
          if (oldByPath.get(fi.path) === fi.text) continue
          running++
          scramble(fi.node, fi.text, 20, oneDone)
        }

        if (running === 0) { unfreeze(); onDone?.(); return }
      }))
    })
  }

  return { play }
}
