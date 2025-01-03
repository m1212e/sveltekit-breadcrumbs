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
    import Breadcrumbs from 'sveltekit-breadcrumbs';
	import type { PathSegment } from 'sveltekit-breadcrumbs';

    type Parameters = keyof LayoutServerLoadEvent['params'];
</script>

<Breadcrumbs
	importObject={import.meta.glob('./**/+page.svelte')}
	availableLanguageTags={availableLanguageTags as any as string[]}
	delimeterSnippet="disabled"
	homePath="/"
>
	{#snippet pathSnippet(pathSegment: PathSegment<Parameters, boolean>)}
		<a class="breadcrumb-snippet" href={pathSegment.href}>
			<i class="icon-for-breadcrumb"></i>
			<p class="ml-2">
				some label for my breadcrumb segment
			</p>
		</a>
	{/snippet}
</Breadcrumbs>
```
### Properties
The component can be configured via a few props:
#### importObject
Depending on where you place the component in your directory tree (best works in a layout file) the component changes its content. To pass all the relevant info, please pass the value of a `import.meta.glob('./**/+page.svelte')` call to this property. This will, relative to the location of the file calling this function, pass all file paths of reachable pages on this level and below to the component.
#### availableLanguageTags
This is optional and can be used to strip language prefixes from the paths. Set this to an array of language tags which might appear in the urls of you application. E.g. `["en", "de"]`.
#### delimeterSnippet
You can optionally set a delimeter snippet which will get placed between all path segments of the generated breadcrumbs.
#### homePath
Where your index/home link should navigate to.
### Example
To see a real world example please see [this project](https://github.com/DeutscheModelUnitedNations/munify-delegator/blob/173630365765ed7c5ee1b9f3f3812b1b9877dd4d/src/routes/(authenticated)/Breadcrumbs.svelte#L1) or the [example directory](./example/)