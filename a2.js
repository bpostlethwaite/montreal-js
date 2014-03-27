/**
 * { Streaming the Internet of Things with Javascript }
 *
 * Many thanks to @substack for inspiration and source materials
 * for this presentation.
   <imgs/doug.png>
 * We should have some ways of connecting programs like a garden hose
 * screw in another segment when it becomes necessary to massage data
 * in another way. This is the way of IO also."
 *
 * "Doug McIlroy. October 11, 1964"
 */



/**
 * { Unix Pipes. Streams 0.0 }
 - Make each program do one thing well. To do a new job, build
 - afresh rather than complicate old programs by adding new features. --

 - Expect the output of every program to become the input to another,
 - as yet unknown, program. Don't clutter output with extraneous information.
 - Avoid stringently columnar or binary input formats.
 - Don't insist on interactive input.

 - Design and build software, even operating systems, to be tried early,
 - ideally within weeks. Don't hesitate to throw away the clumsy parts
 - and rebuild them.

 - Use tools in preference to unskilled help to lighten a programming task,
 - even if you have to detour to build the tools and expect to throw some of
 - them out after you've finished using them. --
 * Doug McIlroy. October 11, 1978
 *
 * >> echo "hello Montreal JS"
 *
 *
 *
 *
 * >> echo "hello Montreal JS" | awk '{print $0 ",", $1}'
 *
 *
 *
 *
 * >> cat bitcoin.csv | head -n 1
 *
 *
 *
 *
 * >> cat bitcoin.csv | head -n 1 | awk -F ',' '{print $1, $NF}'
 *
 *
 *
 *
 * >> cat bitcoin.csv | awk -F',' '{print $1, $NF}' | node {this}
 *
 *
 *
 *
 * >> cat bitcoin.csv | awk -F',' '{print $1, $NF}' | pv -q -L 100 | node {this}
 *
 *
 *
 *
 * >> cat bitcoin.csv | jawk -F',' '{x:1, y:"NF"}' | pv -q -L 200 | node {this}
 */

process.stdin.pipe(process.stdout)











/**
 * { Streaming the Internet of Things with Javascript }
 *
 */

/**
 * { }
 *
 */