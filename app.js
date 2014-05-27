$(function() {
	var container;
	var camera, scene, projector, renderer;
	var mesh, animation;

	init();
	animate();

	function init() {

		container = document.getElementById( 'horse404' );

		var info = document.createElement( 'div' );
		info.style.width = '100%';
		info.style.textAlign = 'center';
		container.appendChild( info );
		//
		console.log($("#horse404").innerWidth());
		camera = new THREE.PerspectiveCamera( 50, $(".page-container").innerWidth() / 700, 1, 10000 );
		camera.position.y = 300;
		camera.target = new THREE.Vector3( 0, 150, 0 );

		scene = new THREE.Scene();

		//

		var light = new THREE.DirectionalLight( 0xefefff, 2 );
		light.position.set( 1, 1, 1 ).normalize();
		scene.add( light );

		var light = new THREE.DirectionalLight( 0xffefef, 2 );
		light.position.set( -1, -1, -1 ).normalize();
		scene.add( light );

		var loader = new THREE.JSONLoader( true );
		loader.load( "horse.js", function ( geometry ) {

			mesh = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: 0x606060, morphTargets: true, overdraw: 0.5 } ) );
			mesh.scale.set( 1.5, 1.5, 1.5 );
			scene.add( mesh );

			animation = new THREE.MorphAnimation( mesh );
			animation.play();

		} );

		//

		renderer = new THREE.CanvasRenderer();
		//renderer.setClearColor( 0xf0f0f0 );
		renderer.setSize( $(".page-container").innerWidth(), 700 );

		container.appendChild(renderer.domElement);

		//

		//

		window.addEventListener( 'resize', onWindowResize, false );

	}

	function onWindowResize() {

		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize( window.innerWidth, window.innerHeight );

	}

	//

	function animate() {

		requestAnimationFrame( animate );

		render();

	}

	var radius = 600;
	var theta = 0;

	var prevTime = Date.now();

	function render() {

		theta += 0.1;

		camera.position.x = radius * Math.sin( THREE.Math.degToRad( theta ) );
		camera.position.z = radius * Math.cos( THREE.Math.degToRad( theta ) );

		camera.lookAt( camera.target );

		if ( animation ) {

			var time = Date.now();

			animation.update( time - prevTime );

			prevTime = time;

		}

		renderer.render( scene, camera );

	}
});
