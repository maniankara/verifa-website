<script lang="ts">
	import { getPostUrl, PostType, type Post } from './posts';
	import PostBadges from './postBadges.svelte';

	export let post: Post;
	export let showBadges: boolean = true;
	export let showPreview: boolean = true;

	const dateOptions = {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	};

	// Make url reactive so that it updates when the post changes
	$: url = getPostUrl(post);
</script>

<div>
	<a href={url} class="group">
		<div class="v-border group-hover:border-v-lilac">
			{#if showPreview && post.previewImage}
				<a href={url}>
					<img src={post.previewImage} alt={post.title} class="object contains w-2/3 h-40" />
				</a>
			{/if}
			<a href={url}>
				<p class="mb-0 group-hover:text-v-lilac">{new Date(post.date).toLocaleDateString()}</p>
				<h4 class="group-hover:text-v-lilac">{post.title}</h4>
				<p>{post.subheading}</p>
			</a>
			{#if showBadges}
				<div class="mb-4">
					<PostBadges type={post.type} tags={post.tags} />
				</div>
			{/if}
		</div>
	</a>
</div>
