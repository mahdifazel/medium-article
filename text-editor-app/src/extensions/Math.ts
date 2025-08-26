import { Node, mergeAttributes } from '@tiptap/core'
import katex from 'katex'

export interface MathOptions {
  HTMLAttributes: Record<string, any>
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    math: {
      /**
       * Insert a math expression at the current position.
       */
      setMath: (content: string) => ReturnType
    }
  }
}

const MathExtension = Node.create<MathOptions>({
  name: 'math',
  inline: true,
  group: 'inline',
  selectable: false,
  atom: true,

  addOptions() {
    return {
      HTMLAttributes: {}
    }
  },

  addAttributes() {
    return {
      content: {
        default: ''
      }
    }
  },

  parseHTML() {
    return [
      {
        tag: 'span[data-type="math"]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    const span = document.createElement('span')
    span.setAttribute('data-type', 'math')
    Object.entries(mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)).forEach(([key, value]) => {
      if (value) span.setAttribute(key, String(value))
    })
    katex.render(String(HTMLAttributes.content || ''), span, { throwOnError: false })
    return span
  },

  addCommands() {
    return {
      setMath:
        content =>
        ({ chain }) => {
          return chain().insertContent({ type: this.name, attrs: { content } }).run()
        },
    }
  },
})

export default MathExtension