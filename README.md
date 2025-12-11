# sveltekit-breadcrumbs

An easy to use breadcrumb component for sveltekit and svelte 5. Uses the filesystem to extract the current path.

## Usage

Add the dependency to your project:

```
bun add -D sveltekit-breadcrumbs
npm i -D sveltekit-breadcrumbs
```

Then you can use the component like this:

```svelte
<script>
  import { Breadcrumbs } from 'sveltekit-breadcrumbs';
  import type { PathSegment } from 'sveltekit-breadcrumbs';

  // since your URL can contain variables and SvelteKit provides us with a type which
  // represents these keys, we get it here
  // and use it below for improved type safety
  type Parameters = keyof LayoutServerLoadEvent['params'];
</script>

<Breadcrumbs
  importObject={import.meta.glob('./**/+page.svelte')}
  availableLanguageTags={["en", "de"]}
  delimeterSnippet="disabled"
  homePath="/"
>
  {#snippet pathSnippet(pathSegment: PathSegment<Parameters, boolean>)}
    <a class="breadcrumb-snippet" href={pathSegment.href}>
      <i class="icon-for-breadcrumb"></i>
        <p class="ml-2">
          {pathSegment.key}
        </p>
    </a>
  {/snippet}
</Breadcrumbs>
```

> Note that the `import.meta.glob('./**/+page.svelte')` call is responsible for providing the component with displayable path info. Therefore you can expect all pages in the current path and its subpaths but no parent directory will be respected.

### Properties

The component can be configured via a few props:

#### importObject

Depending on where you place the component in your directory tree (best works in a layout file) the component changes its content. To pass all the relevant info, please pass the value of a `import.meta.glob('./**/+page.svelte')` call to this property. This will, relative to the location of the file calling this function, pass all file paths of reachable pages on this level and below to the component. Providing a call executed in the most upper layout will provide a longer list of segments than one lower in the file tree.

#### availableLanguageTags

This is optional and can be used to strip language prefixes from the paths. Set this to an array of language tags which might appear in the urls of you application. E.g. `["en", "de"]`.

#### delimeterSnippet

You can optionally set a delimeter snippet which will get placed between all path segments of the generated breadcrumbs.

#### homePath

Where your index/home link should navigate to.

### PathSegment

The `PathSegment` type, which is provided to the snippet contains a few helpful fields which describe each breadcrumb segment.

#### key

The key of the segment. In a path like this: `/home/profile/[me]/friends` the keys would be `home`,`profile`,`me`,`friends`.

#### isParameter

This is true when the segment is a path parameter. Following the above example, only the `[me]` segment would be true.

#### value

This is only set when the segment is a path parameter and holds the value of the segment. Following the above example, this could contain the userId (`/home/profile/1234/friends` => `undefined`, `undefined`, `1234`, `undefined`).

#### href

The href field contains the absolute url to the segment. This is useful if you want to implement navigations to each segment e.g. via `<a href={segment.href}>`

### Example

To see a real world example please see [this project](<https://github.com/DeutscheModelUnitedNations/munify-delegator/blob/d6e2796ffaabd0ef859000bbe09ca4d472462d30/src/routes/(authenticated)/Breadcrumbs.svelte#L2>) or the [example directory](./example/)
