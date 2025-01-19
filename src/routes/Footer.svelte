<script lang="ts">
    import { faGithub,faInstagram, faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';
    import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
    import { t } from 'svelte-i18n';
</script>

<footer aria-label="Footer Informasjon">
	<div class="content">
		<div class="footer-col">
			<h3 id="header">© 2025 Aleksander Ekman</h3>
		</div>
		<div class="footer-col">
			<h3 id="header">{ $t('location') }</h3>
			<ul>
				<li>
                    Oslo, { $t('norway') }
				</li>
			</ul>
		</div>
		<div class="footer-col">
			<h3 id="header">{ $t('contactMe')}</h3>
			<ul>
				<li><a href="mailto:aleksander.ekman1@gmail.com">aleksander.ekman1@gmail.com</a></li>
                <li></li>
			</ul>
		</div>
        <div class="footer-col">
            <h3 id="header">{ $t('SocialMedia') }</h3>
            <ul>
                <li>
                    <a href="https://github.com/allsers"  target="_blank" rel="noopener">
                        <FontAwesomeIcon icon={faGithub} /> GitHub
                    </a>
                </li>
                <li>
                    <a href="https://www.instagram.com/aleksanderekman/" target="_blank" rel="noopener">
                        <FontAwesomeIcon icon={faInstagram} /> Instagram
                    </a>
                </li>
                <li>
                    <a href="https://www.facebook.com/profile.php?id=100092579926144" target="_blank" rel="noopener">
                        <FontAwesomeIcon icon={faFacebook} /> Facebook
                    </a>
                </li>
                <li>
                    <a href="https://www.linkedin.com/in/aleksander-ekman-a4b6712ba/" target="_blank" rel="noopener">
                        <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
                    </a>
                </li>
                <li>
                </li>
            </ul>
        </div>
	</div>
</footer>

<style>
	footer {
        height: auto;
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		padding: 2.75rem 0em;
        color: #0A1828;
		box-shadow: 0 -3px 15px rgba(255, 255, 255, 0.2);
		text-wrap: nowrap;
	}

	.content {
        overflow: hidden;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: flex-start;
		width: 100%;
		max-width: 1200px;
		gap: 3em;
	}

	.footer-col {
        overflow: hidden;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center; 
		flex: 1; 
		padding: 0 0.5em;
	}

	#header {
		font-size: 1.3rem;
		font-weight: bold;
		color:var(--text-color);
		margin-bottom: 0.5em;
	}

	ul {
		list-style-type: none;
		padding: 0;
		margin: 0;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
	}

	li {
        position: relative; 
		font-size: 1.1rem;
		color: var(--text-color);
		margin: 0.1em 0;
	}
    li a::after {
		content: '';
		position: absolute;
		width: 0;
		height: 1px;
		bottom: -2px;
		left: 0;
		background-color: var(--text-color);
		transition: width 0.2s ease;
	}
    li a:hover::after {
		width: 100%;
	}
    :global(li a svg) {
		transition: transform 0.3s ease;
	}
    :global(li a:hover svg) {
        transform: rotate(360deg);
    }
	a {
		color: var(--text-color);
		text-decoration: none;
	}

	a:hover {
        cursor: none;
	}

	@media (max-width: 880px) {
		footer {
			flex-direction: column;
			align-items: center;
		}

		.content {
			flex-direction: column;
			align-items: center;
		}

		.footer-col {
			width: 100%;
			align-items: center;
			text-align: center;
			padding: 0.5em 0;
		}

		li {
			text-align: center;
		}
	}

	@media (max-width: 1030px) and (orientation: landscape) {
		#header {
			font-size: 0.9em;
		}


		li {
			font-size: 0.8em;
		}
	}
	@media (max-width: 480px) {
		#header {
			font-size: 1.1em;
		}

		li {
			font-size: 0.8em;
		}
		footer {
			height: auto;
		}
		.content {
			gap: 2.2rem;
		}
	}
</style>
