// Dynamic header injection, gallery modal, and link click logging

const mountHeader = () => {
  const mount = document.getElementById('site-header-mount')
  if (!mount) return

  const header = document.createElement('header')
  header.className = 'site-header'
  header.innerHTML = `
    <div class="site-header__inner" role="banner">
      <a href="./" class="logo" aria-label="Home">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
          <path d="M4 10L12 4l8 6v9a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9z" fill="white"/>
        </svg>
      </a>
      <h1 class="site-title h1">Orchard FED Assessment 2025</h1>
      <a class="skip-link" href="#main-content">Skip to content</a>
    </div>
  `

  mount.replaceWith(header)
}

// Modal utilities
let activeTrigger = null

const openImageModal = ({ src, alt }) => {
  const modalRoot = document.getElementById('modal-root')
  if (!modalRoot) return

  const backdrop = document.createElement('div')
  backdrop.className = 'modal-backdrop'
  backdrop.setAttribute('role', 'dialog')
  backdrop.setAttribute('aria-modal', 'true')
  backdrop.setAttribute('aria-label', 'Image preview')

  backdrop.innerHTML = `
    <div class="modal" tabindex="-1">
      <div class="modal__header">
        <h2 class="modal__title">Image preview</h2>
        <button class="modal__close" type="button" aria-label="Close image preview">Close</button>
      </div>
      <div class="modal__body">
        <img class="modal__img" src="${src}" alt="${alt}" />
      </div>
    </div>
  `

  const modal = backdrop.querySelector('.modal')
  const closeBtn = backdrop.querySelector('.modal__close')

  const close = () => {
    window.removeEventListener('keydown', onKey)
    backdrop.removeEventListener('click', onBackdropClick)
    backdrop.remove()
    if (activeTrigger) activeTrigger.focus()
    activeTrigger = null
  }

  const onBackdropClick = (e) => {
    if (e.target === backdrop || e.target === closeBtn) close()
  }

  const onKey = (e) => {
    if (e.key === 'Escape') close()
    if (e.key === 'Tab') {
      // Basic focus containment: keep focus within modal
      const focusables = backdrop.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )
      if (focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
  }

  window.addEventListener('keydown', onKey)
  backdrop.addEventListener('click', onBackdropClick)
  modalRoot.appendChild(backdrop)
  // Move focus into modal
  closeBtn.focus()
}

const enhanceGallery = () => {
  const gallery = document.querySelector('.gallery')
  if (!gallery) return

  gallery.addEventListener('click', (e) => {
    const img = e.target.closest('img')
    if (!img) return
    const li = e.target.closest('li')
    if (!li) return
    // Remember trigger to return focus after closing
    activeTrigger = img
    openImageModal({
      src: img.getAttribute('src'),
      alt: img.getAttribute('alt') || '',
    })
  })

  // Keyboard activation for images
  gallery.querySelectorAll('img').forEach((img) => {
    img.setAttribute('tabindex', '0')
    img.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        activeTrigger = img
        openImageModal({
          src: img.getAttribute('src'),
          alt: img.getAttribute('alt') || '',
        })
      }
    })
  })
}

const logAnchorClicks = () => {
  // Delegated listener logs every anchor element that is clicked
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a')
    if (!anchor) return
    // eslint-disable-next-line no-console
    console.log('Anchor clicked:', anchor)
  })
}

// Apply modal behavior to the three photos in the Image/Text block
const enhanceImageTextBlock = () => {
  const media = document.querySelector('.BlockImage-Text__media')
  if (!media) return

  media.addEventListener('click', (e) => {
    const img = e.target.closest('img')
    if (!img) return
    activeTrigger = img
    openImageModal({
      src: img.getAttribute('src'),
      alt: img.getAttribute('alt') || '',
    })
  })

  media.querySelectorAll('img').forEach((img) => {
    img.setAttribute('tabindex', '0')
    img.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        activeTrigger = img
        openImageModal({
          src: img.getAttribute('src'),
          alt: img.getAttribute('alt') || '',
        })
      }
    })
  })
}

document.addEventListener('DOMContentLoaded', () => {
  mountHeader()
  enhanceGallery()
  enhanceImageTextBlock()
  logAnchorClicks()

  // Simulated CMS content injection
  const cms = {
    wdcm: {
      heading: 'WHAT DOES COOKING MEAN?',
      body: 'Is it simply applying heat to a food product? A way of making certain food safe to eat? Or a way to create flavour and make food more appealing? This is just part of what Hervé This, the father of molecular gastronomy, has dedicated his life to finding out. We spoke to him to find out what his experiments have told him. And in the process even discovered the secret to cooking the perfect egg…',
      kicker: 'THE PERFECT EGG',
      tip: 'Keep water between 67 and 68°C for a flavourful, tender yolk',
      images: {
        left: {
          alt: 'Boiling pot with cylindrical food wrapped in green leaves over open fire',
        },
        rightTop: {
          alt: 'Person in white lab coat arranging food items on gridded surface with handwritten labels',
        },
        rightBottom: {
          alt: 'Egg carton with eight cracked eggs showing varying degrees of doneness from runny to solidified yolks',
        },
      },
    },
    cards: {
      heading: 'TASTE THE COLOURS',
      items: [
        {
          title: 'RED',
          body: 'Red foods remind us of berries and soft fruits, so we anticipate a sweet taste.',
          cta: 'Learn more',
          image: {
            alt: 'Red themed food on spoon',
          },
        },
        {
          title: 'GREEN',
          body: 'Fresh, zingy green colours are reminiscent of unripe fruit, promising sour or acid flavours.',
          cta: 'Learn more',
          image: {
            alt: 'Green themed food on spoon',
          },
        },
        {
          title: 'WHITE',
          body: 'White foods evoke memories of salt and salty flavours, driving the expectation of a savoury treat.',
          cta: 'Learn more',
          image: {
            alt: 'White themed food on spoon',
          },
        },
      ],
    },
  }

  const setText = (selector, text) => {
    const el = document.querySelector(`[data-cms="${selector}"]`)
    if (el) el.textContent = text
  }

  const setAttribute = (selector, attribute, value) => {
    const el = document.querySelector(`[data-cms="${selector}"]`)
    if (el) el.setAttribute(attribute, value)
  }

  // Inject text content
  setText('wdcm.heading', cms.wdcm.heading)
  setText('wdcm.body', cms.wdcm.body)
  setText('wdcm.kicker', cms.wdcm.kicker)
  setText('wdcm.tip', cms.wdcm.tip)
  setText('cards.heading', cms.cards.heading)

  cms.cards.items.forEach((item, idx) => {
    setText(`cards.items.${idx}.title`, item.title)
    setText(`cards.items.${idx}.body`, item.body)
    setText(`cards.items.${idx}.cta`, item.cta)
  })

  // Inject alt-text for images
  setAttribute('wdcm.images.left.alt', 'alt', cms.wdcm.images.left.alt)
  setAttribute('wdcm.images.rightTop.alt', 'alt', cms.wdcm.images.rightTop.alt)
  setAttribute(
    'wdcm.images.rightBottom.alt',
    'alt',
    cms.wdcm.images.rightBottom.alt,
  )

  cms.cards.items.forEach((item, idx) => {
    setAttribute(`cards.items.${idx}.image.alt`, 'alt', item.image.alt)
  })
})
