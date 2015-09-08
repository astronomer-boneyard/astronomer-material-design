// Create this file inside /js/ directory!

var getRecentPosts = function(amount, callback) {
	var rss = $("link[type='application/rss+xml']").attr("href");

	console.log(rss);

	$.get(rss, function(data) {
		var recent = [];
		var parsed = $.parseXML(data);
		var posts  = $(data).find("item");

		if (amount) posts = posts.slice(0, amount); // Only display the first number of posts (defined by amount)

		for (var i = 0; posts && i < posts.length; i++) {
			var post = posts.eq(i);
			recent.push({
				title: 	 post.find("title").text(),
				content: post.find("description").text(),
				url: 	 post.find("link").text(),
				date: 	 post.find("pubDate").text()
			});
		}

		callback(recent); // Done collecting posts, process to callback
	});
};

var crop = function(str, words) {
    var cache = str.split(/\s+/, words);
    return cache.join(" ");
}

// Gets called on document ready
$(function() {
	var num_posts = 15;
	var num_words = 40;

	getRecentPosts(num_posts, function(posts) { // Display [x-null] posts!
		var template = "";
		for (var i = 0; i < posts.length; i++) {
			var post = posts[i];
			var excerpt = crop($("<div/>").html(post.content).text(), num_words); // strip html and crop string!

		    template += "<article class='mdl-cell mdl-cell--3-col mdl-cell--4-col-tablet mdl-cell--4-col-phone mdl-card mdl-shadow--3dp post-cell'><span>"
					+"<div class='mdl-card__title'><h2 class='mdl-card__title-text'>"
					+ post.title + "</h2></div><div class='mdl-card__supporting-text'><p class='mdl-typography--font-light mdl-typography--subhead'>"
					+ excerpt + "..."+"</p></div></span><div class='mdl-card__actions'><a class='astronomer-link mdl-button mdl-js-button mdl-typography--text-uppercase' href='"
					+ post.url + "'>Read More...</a></div></article>";
		}
		$("#posts_list").html(template)
	});
});
