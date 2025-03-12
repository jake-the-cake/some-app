import { changeTitle } from '../../lib/meta.js'
import { loadTemplate } from '../../lib/templates.js'

changeTitle('Topics')

loadTemplate('/static/apps/topics/template.html', '#root')