# CSS Organization

This directory contains the organized CSS files split from the original `App.css` file for better maintainability and organization.

## File Structure

### `index.css`
Main entry point that imports all other CSS files in the correct order.

### `base.css`
- Root styles (`#root`)
- Logo styles and animations
- Basic element styles (`.card`, `.read-the-docs`)

### `layout.css`
- Page selector and navigation styles
- Desktop navigation (sidebar)
- Mobile navigation (hamburger menu with slide-out panel)
- Responsive navigation breakpoints

### `maximizer.css`
- Main maximizer page container and header
- Top summary section styles
- Card selection section and impact cards
- Summary section styles

### `table.css`
- Spending input section styles
- Rate toggle section
- Table container and spend table styles
- Input fields and form elements
- Table row styles (annual fee, benefits, totals)

### `assumptions.css`
- Assumptions section container
- Collapsible header styles
- Point value input grids and forms
- Reset button styles

### `welcome.css`
- Welcome section and card styles
- Welcome page buttons and actions
- Welcome page specific input styles

### `spending-summary.css`
- Spending summary card styles
- Card group layouts
- Category item styles
- Print styles
- Signup links section

### `responsive.css`
- All responsive design media queries
- Mobile-first responsive design
- Breakpoints: 1024px, 768px, 480px, 375px
- Mobile-specific table adjustments
- Ultra-compact mobile styles

## Usage

The main `App.css` file now only contains an import statement that pulls in all the organized CSS files. This makes it easier to:

1. **Find specific styles** - Each file has a clear purpose
2. **Edit related styles** - All related styles are grouped together
3. **Maintain responsive design** - All media queries are in one place
4. **Add new features** - Clear where to add new styles

## Adding New Styles

When adding new styles, consider which file they belong to:

- **New page styles** → Create a new file or add to existing page-specific file
- **New components** → Add to appropriate existing file or create new component file
- **Responsive adjustments** → Add to `responsive.css`
- **Base styles** → Add to `base.css`

## Import Order

The import order in `index.css` is important:
1. Base styles first
2. Layout and navigation
3. Page-specific styles
4. Component styles
5. Responsive styles last (to override as needed)
