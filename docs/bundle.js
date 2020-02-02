
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.head.appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if (typeof $$scope.dirty === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        if (value != null || input.value) {
            input.value = value;
        }
    }
    function set_style(node, key, value, important) {
        node.style.setProperty(key, value, important ? 'important' : '');
    }
    function select_option(select, value) {
        for (let i = 0; i < select.options.length; i += 1) {
            const option = select.options[i];
            if (option.__value === value) {
                option.selected = true;
                return;
            }
        }
    }
    function select_value(select) {
        const selected_option = select.querySelector(':checked') || select.options[0];
        return selected_option && selected_option.__value;
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error(`Function called outside component initialization`);
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    const seen_callbacks = new Set();
    function flush() {
        do {
            // first, call beforeUpdate functions
            // and update components
            while (dirty_components.length) {
                const component = dirty_components.shift();
                set_current_component(component);
                update(component.$$);
            }
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    const globals = (typeof window !== 'undefined' ? window : global);
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const prop_values = options.props || {};
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, prop_values, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if ($$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(children(options.target));
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set() {
            // overridden by instance, if it has props
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.18.1' }, detail)));
    }
    function append_dev(target, node) {
        dispatch_dev("SvelteDOMInsert", { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev("SvelteDOMInsert", { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev("SvelteDOMRemove", { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ["capture"] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev("SvelteDOMAddEventListener", { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev("SvelteDOMRemoveEventListener", { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev("SvelteDOMRemoveAttribute", { node, attribute });
        else
            dispatch_dev("SvelteDOMSetAttribute", { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.data === data)
            return;
        dispatch_dev("SvelteDOMSetData", { node: text, data });
        text.data = data;
    }
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error(`'target' is a required option`);
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn(`Component was already destroyed`); // eslint-disable-line no-console
            };
        }
    }

    /* src/FooterItem.svelte generated by Svelte v3.18.1 */

    const file = "src/FooterItem.svelte";

    function create_fragment(ctx) {
    	let div;
    	let i;
    	let t0;
    	let span;
    	let t1;
    	let t2;
    	let current;
    	let dispose;
    	const default_slot_template = /*$$slots*/ ctx[5].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[4], null);

    	const block = {
    		c: function create() {
    			div = element("div");
    			i = element("i");
    			t0 = space();
    			span = element("span");
    			t1 = text(/*caption*/ ctx[0]);
    			t2 = space();
    			if (default_slot) default_slot.c();
    			attr_dev(i, "class", /*icon*/ ctx[3]);
    			add_location(i, file, 8, 2, 177);
    			set_style(span, "padding", "0px 0px 0px 0px");
    			set_style(span, "top", "auto");
    			set_style(span, "bottom", "auto");
    			add_location(span, file, 10, 2, 199);
    			attr_dev(div, "class", /*className*/ ctx[2]);
    			add_location(div, file, 7, 0, 131);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, i);
    			append_dev(div, t0);
    			append_dev(div, span);
    			append_dev(span, t1);
    			append_dev(div, t2);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			current = true;
    			dispose = listen_dev(div, "click", /*callback*/ ctx[1], false, false, false);
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*icon*/ 8) {
    				attr_dev(i, "class", /*icon*/ ctx[3]);
    			}

    			if (!current || dirty & /*caption*/ 1) set_data_dev(t1, /*caption*/ ctx[0]);

    			if (default_slot && default_slot.p && dirty & /*$$scope*/ 16) {
    				default_slot.p(get_slot_context(default_slot_template, ctx, /*$$scope*/ ctx[4], null), get_slot_changes(default_slot_template, /*$$scope*/ ctx[4], dirty, null));
    			}

    			if (!current || dirty & /*className*/ 4) {
    				attr_dev(div, "class", /*className*/ ctx[2]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { caption } = $$props;
    	let { callback = null } = $$props;
    	let { className = "footer-item" } = $$props;
    	let { icon } = $$props;
    	const writable_props = ["caption", "callback", "className", "icon"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<FooterItem> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;

    	$$self.$set = $$props => {
    		if ("caption" in $$props) $$invalidate(0, caption = $$props.caption);
    		if ("callback" in $$props) $$invalidate(1, callback = $$props.callback);
    		if ("className" in $$props) $$invalidate(2, className = $$props.className);
    		if ("icon" in $$props) $$invalidate(3, icon = $$props.icon);
    		if ("$$scope" in $$props) $$invalidate(4, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => {
    		return { caption, callback, className, icon };
    	};

    	$$self.$inject_state = $$props => {
    		if ("caption" in $$props) $$invalidate(0, caption = $$props.caption);
    		if ("callback" in $$props) $$invalidate(1, callback = $$props.callback);
    		if ("className" in $$props) $$invalidate(2, className = $$props.className);
    		if ("icon" in $$props) $$invalidate(3, icon = $$props.icon);
    	};

    	return [caption, callback, className, icon, $$scope, $$slots];
    }

    class FooterItem extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance, create_fragment, safe_not_equal, {
    			caption: 0,
    			callback: 1,
    			className: 2,
    			icon: 3
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "FooterItem",
    			options,
    			id: create_fragment.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*caption*/ ctx[0] === undefined && !("caption" in props)) {
    			console.warn("<FooterItem> was created without expected prop 'caption'");
    		}

    		if (/*icon*/ ctx[3] === undefined && !("icon" in props)) {
    			console.warn("<FooterItem> was created without expected prop 'icon'");
    		}
    	}

    	get caption() {
    		throw new Error("<FooterItem>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set caption(value) {
    		throw new Error("<FooterItem>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get callback() {
    		throw new Error("<FooterItem>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set callback(value) {
    		throw new Error("<FooterItem>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get className() {
    		throw new Error("<FooterItem>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set className(value) {
    		throw new Error("<FooterItem>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get icon() {
    		throw new Error("<FooterItem>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set icon(value) {
    		throw new Error("<FooterItem>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/FooterItemClear.svelte generated by Svelte v3.18.1 */

    function create_fragment$1(ctx) {
    	let current;

    	const footeritem = new FooterItem({
    			props: {
    				callback: clearEditor,
    				caption: "Clear",
    				icon: "fa fa-eraser"
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(footeritem.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(footeritem, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(footeritem.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(footeritem.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(footeritem, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function clearEditor() {
    	const confirm = window.confirm("Delete all content from the editor?");
    	if (!confirm) return;
    	localStorage.removeItem("content");
    	sessionStorage.removeItem("documentName");
    	location.reload();
    }

    class FooterItemClear extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "FooterItemClear",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src/FooterItemExport.svelte generated by Svelte v3.18.1 */

    function create_fragment$2(ctx) {
    	let current;

    	const footeritem = new FooterItem({
    			props: {
    				callback: downloadFile,
    				caption: "Export",
    				icon: "fa fa-download"
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(footeritem.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(footeritem, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(footeritem.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(footeritem.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(footeritem, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function downloadFile() {
    	const content = localStorage.getItem("content");

    	if (!content) {
    		return;
    	}

    	let documentName = sessionStorage.getItem("documentName");

    	if (!documentName) {
    		documentName = content.slice(0, 10);
    	}

    	var a = window.document.createElement("a");
    	a.href = window.URL.createObjectURL(new Blob([content], { type: "text/plain" }));
    	a.download = documentName;
    	document.body.appendChild(a);
    	a.click();
    	document.body.removeChild(a);
    }

    class FooterItemExport extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "FooterItemExport",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src/FooterItemImport.svelte generated by Svelte v3.18.1 */
    const file$1 = "src/FooterItemImport.svelte";

    // (16:0) <FooterItem   callback={() => {     document.getElementById('file-input').click();   }}   caption="Open"   icon="fa fa-upload">
    function create_default_slot(ctx) {
    	let input;
    	let dispose;

    	const block = {
    		c: function create() {
    			input = element("input");
    			attr_dev(input, "id", "file-input");
    			attr_dev(input, "type", "file");
    			attr_dev(input, "name", "name");
    			set_style(input, "display", "none");
    			add_location(input, file$1, 21, 2, 524);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			dispose = listen_dev(input, "change", /*change_handler*/ ctx[1], false, false, false);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(16:0) <FooterItem   callback={() => {     document.getElementById('file-input').click();   }}   caption=\\\"Open\\\"   icon=\\\"fa fa-upload\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let current;

    	const footeritem = new FooterItem({
    			props: {
    				callback: /*func*/ ctx[0],
    				caption: "Open",
    				icon: "fa fa-upload",
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(footeritem.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(footeritem, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const footeritem_changes = {};

    			if (dirty & /*$$scope*/ 4) {
    				footeritem_changes.$$scope = { dirty, ctx };
    			}

    			footeritem.$set(footeritem_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(footeritem.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(footeritem.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(footeritem, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function openFile(e) {
    	const textFile = e.target.files[0];
    	const fr = new FileReader();

    	fr.addEventListener("load", () => {
    		localStorage.setItem("content", event.target.result);
    		sessionStorage.setItem("documentName", textFile.name);
    		location.reload();
    	});

    	fr.readAsText(textFile);
    }

    function instance$1($$self) {
    	const func = () => {
    		document.getElementById("file-input").click();
    	};

    	const change_handler = e => openFile(e);

    	$$self.$capture_state = () => {
    		return {};
    	};

    	$$self.$inject_state = $$props => {
    		
    	};

    	return [func, change_handler];
    }

    class FooterItemImport extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "FooterItemImport",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src/FooterItemFullscreen.svelte generated by Svelte v3.18.1 */

    function create_fragment$4(ctx) {
    	let current;

    	const footeritem = new FooterItem({
    			props: {
    				caption: "",
    				icon: "fa fa-compress-arrows-alt",
    				callback: toggleFullScreen
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(footeritem.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(footeritem, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(footeritem.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(footeritem.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(footeritem, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function toggleFullScreen() {
    	if (document.fullscreenElement) {
    		document.exitFullscreen();
    	} else {
    		document.documentElement.requestFullscreen();
    	}
    }

    class FooterItemFullscreen extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "FooterItemFullscreen",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    const themes =
    	[
    		"default",
    		"oasis",
    		"oldschool",
    		"saturday",
    		"simple",
    		"sunday",
    		"narrow",
    		"vscode",
    		"vault76",
    	];

    /* src/ThemeSelector.svelte generated by Svelte v3.18.1 */

    const { console: console_1 } = globals;
    const file$2 = "src/ThemeSelector.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[3] = list[i];
    	return child_ctx;
    }

    // (17:4) {#each themes as item}
    function create_each_block(ctx) {
    	let option;
    	let t_value = /*item*/ ctx[3] + "";
    	let t;
    	let option_value_value;

    	const block = {
    		c: function create() {
    			option = element("option");
    			t = text(t_value);
    			option.__value = option_value_value = /*item*/ ctx[3];
    			option.value = option.__value;
    			add_location(option, file$2, 18, 6, 502);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, option, anchor);
    			append_dev(option, t);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(option);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(17:4) {#each themes as item}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$5(ctx) {
    	let div;
    	let i;
    	let t;
    	let select;
    	let dispose;
    	let each_value = themes;
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			i = element("i");
    			t = space();
    			select = element("select");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(i, "class", "fa fa-palette");
    			add_location(i, file$2, 14, 2, 340);
    			attr_dev(select, "id", "themeSelector");
    			if (/*theme*/ ctx[1] === void 0) add_render_callback(() => /*select_change_handler*/ ctx[2].call(select));
    			add_location(select, file$2, 15, 2, 370);
    			attr_dev(div, "class", /*className*/ ctx[0]);
    			add_location(div, file$2, 13, 0, 314);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, i);
    			append_dev(div, t);
    			append_dev(div, select);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(select, null);
    			}

    			select_option(select, /*theme*/ ctx[1]);

    			dispose = [
    				listen_dev(select, "change", /*select_change_handler*/ ctx[2]),
    				listen_dev(select, "change", changeTheme, false, false, false)
    			];
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*themes*/ 0) {
    				each_value = themes;
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(select, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (dirty & /*theme*/ 2) {
    				select_option(select, /*theme*/ ctx[1]);
    			}

    			if (dirty & /*className*/ 1) {
    				attr_dev(div, "class", /*className*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function changeTheme(e) {
    	const theme = e.target.value;
    	localStorage.setItem("theme", theme);
    	console.log(e.target.value);
    	location.reload();
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { className = "footer-item" } = $$props;
    	let theme = localStorage.getItem("theme");
    	const writable_props = ["className"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1.warn(`<ThemeSelector> was created with unknown prop '${key}'`);
    	});

    	function select_change_handler() {
    		theme = select_value(this);
    		$$invalidate(1, theme);
    	}

    	$$self.$set = $$props => {
    		if ("className" in $$props) $$invalidate(0, className = $$props.className);
    	};

    	$$self.$capture_state = () => {
    		return { className, theme };
    	};

    	$$self.$inject_state = $$props => {
    		if ("className" in $$props) $$invalidate(0, className = $$props.className);
    		if ("theme" in $$props) $$invalidate(1, theme = $$props.theme);
    	};

    	return [className, theme, select_change_handler];
    }

    class ThemeSelector extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$5, safe_not_equal, { className: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ThemeSelector",
    			options,
    			id: create_fragment$5.name
    		});
    	}

    	get className() {
    		throw new Error("<ThemeSelector>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set className(value) {
    		throw new Error("<ThemeSelector>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var name = "txtdit";
    var version = "1.0.1";
    var scripts = {
    	build: "rollup -c",
    	dev: "rollup -c -w",
    	start: "sirv docs"
    };
    var devDependencies = {
    	"@rollup/plugin-commonjs": "^11.0.0",
    	"@rollup/plugin-node-resolve": "^7.0.0",
    	rollup: "^1.20.0",
    	"rollup-plugin-livereload": "^1.0.0",
    	"rollup-plugin-sass": "^1.2.2",
    	"rollup-plugin-scss": "^2.1.0",
    	"rollup-plugin-svelte": "^5.0.3",
    	"rollup-plugin-terser": "^5.1.2",
    	sass: "^1.25.0",
    	svelte: "^3.0.0",
    	"svelte-preprocess": "^3.3.1"
    };
    var dependencies = {
    	"sirv-cli": "^0.4.4"
    };
    var pkg = {
    	name: name,
    	version: version,
    	scripts: scripts,
    	devDependencies: devDependencies,
    	dependencies: dependencies
    };

    /* src/Footer.svelte generated by Svelte v3.18.1 */
    const file$3 = "src/Footer.svelte";

    function create_fragment$6(ctx) {
    	let div0;
    	let t0;
    	let div1;
    	let t1;
    	let div2;
    	let t2;
    	let t3;
    	let t4;
    	let current;
    	const themeselector = new ThemeSelector({ $$inline: true });

    	const footeritem = new FooterItem({
    			props: {
    				caption: pkg.version,
    				icon: "fa fa-code-branch"
    			},
    			$$inline: true
    		});

    	const footeritemclear = new FooterItemClear({ $$inline: true });
    	const footeritemimport = new FooterItemImport({ $$inline: true });
    	const footeritemexport = new FooterItemExport({ $$inline: true });
    	const footeritemfullscreen = new FooterItemFullscreen({ $$inline: true });

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			create_component(themeselector.$$.fragment);
    			t0 = space();
    			div1 = element("div");
    			create_component(footeritem.$$.fragment);
    			t1 = space();
    			div2 = element("div");
    			create_component(footeritemclear.$$.fragment);
    			t2 = space();
    			create_component(footeritemimport.$$.fragment);
    			t3 = space();
    			create_component(footeritemexport.$$.fragment);
    			t4 = space();
    			create_component(footeritemfullscreen.$$.fragment);
    			attr_dev(div0, "class", "footer-item-container");
    			add_location(div0, file$3, 11, 0, 454);
    			attr_dev(div1, "class", "footer-middle");
    			add_location(div1, file$3, 14, 0, 517);
    			attr_dev(div2, "class", "footer-item-container");
    			add_location(div2, file$3, 17, 0, 616);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			mount_component(themeselector, div0, null);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div1, anchor);
    			mount_component(footeritem, div1, null);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div2, anchor);
    			mount_component(footeritemclear, div2, null);
    			append_dev(div2, t2);
    			mount_component(footeritemimport, div2, null);
    			append_dev(div2, t3);
    			mount_component(footeritemexport, div2, null);
    			append_dev(div2, t4);
    			mount_component(footeritemfullscreen, div2, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(themeselector.$$.fragment, local);
    			transition_in(footeritem.$$.fragment, local);
    			transition_in(footeritemclear.$$.fragment, local);
    			transition_in(footeritemimport.$$.fragment, local);
    			transition_in(footeritemexport.$$.fragment, local);
    			transition_in(footeritemfullscreen.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(themeselector.$$.fragment, local);
    			transition_out(footeritem.$$.fragment, local);
    			transition_out(footeritemclear.$$.fragment, local);
    			transition_out(footeritemimport.$$.fragment, local);
    			transition_out(footeritemexport.$$.fragment, local);
    			transition_out(footeritemfullscreen.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			destroy_component(themeselector);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div1);
    			destroy_component(footeritem);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div2);
    			destroy_component(footeritemclear);
    			destroy_component(footeritemimport);
    			destroy_component(footeritemexport);
    			destroy_component(footeritemfullscreen);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self) {
    	console.log(`running version ${pkg.version}`);

    	$$self.$capture_state = () => {
    		return {};
    	};

    	$$self.$inject_state = $$props => {
    		
    	};

    	return [];
    }

    class Footer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$6, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Footer",
    			options,
    			id: create_fragment$6.name
    		});
    	}
    }

    /* src/Dropzone.svelte generated by Svelte v3.18.1 */

    function create_fragment$7(ctx) {
    	const block = {
    		c: noop,
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: noop,
    		p: noop,
    		i: noop,
    		o: noop,
    		d: noop
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self) {
    	onMount(() => {
    		let dropArea = document.getElementById("main");

    		["dragenter", "dragover", "dragleave", "drop"].forEach(eventName => {
    			dropArea.addEventListener(eventName, preventDefaults, false);
    		});

    		function preventDefaults(e) {
    			e.preventDefault();
    			e.stopPropagation();
    		}

    		["dragenter", "dragover"].forEach(eventName => {
    			dropArea.addEventListener(eventName, highlight, false);
    		});

    		["dragleave", "drop"].forEach(eventName => {
    			dropArea.addEventListener(eventName, unhighlight, false);
    		});

    		function highlight(e) {
    			dropArea.classList.add("highlight");
    		}

    		function unhighlight(e) {
    			dropArea.classList.remove("highlight");
    		}

    		dropArea.addEventListener("drop", handleDrop, false);

    		function readFile(event) {
    			// textarea.textContent = event.target.result;
    			localStorage.setItem("content", event.target.result);

    			location.reload();
    		}

    		function handleDrop(e) {
    			let dt = e.dataTransfer;
    			let file = dt.files[0];
    			const objectURL = window.URL.createObjectURL(file);
    			const fr = new FileReader();
    			fr.addEventListener("load", readFile);
    			fr.readAsText(file);
    		} // handleFiles(files);
    	});

    	$$self.$capture_state = () => {
    		return {};
    	};

    	$$self.$inject_state = $$props => {
    		
    	};

    	return [];
    }

    class Dropzone extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$7, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Dropzone",
    			options,
    			id: create_fragment$7.name
    		});
    	}
    }

    /* src/Editor.svelte generated by Svelte v3.18.1 */
    const file$4 = "src/Editor.svelte";

    function create_fragment$8(ctx) {
    	let div;
    	let textarea;
    	let t;
    	let current;
    	let dispose;
    	const dropzone = new Dropzone({ $$inline: true });

    	const block = {
    		c: function create() {
    			div = element("div");
    			textarea = element("textarea");
    			t = space();
    			create_component(dropzone.$$.fragment);
    			attr_dev(textarea, "name", "editor");
    			attr_dev(textarea, "id", "editor");
    			attr_dev(textarea, "cols", "30");
    			attr_dev(textarea, "rows", "10");
    			add_location(textarea, file$4, 23, 2, 582);
    			attr_dev(div, "class", "editor-text-container");
    			add_location(div, file$4, 22, 0, 544);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, textarea);
    			set_input_value(textarea, /*content*/ ctx[0]);
    			append_dev(div, t);
    			mount_component(dropzone, div, null);
    			current = true;

    			dispose = [
    				listen_dev(textarea, "input", /*textarea_input_handler*/ ctx[2]),
    				listen_dev(textarea, "keydown", handleInput, false, false, false),
    				listen_dev(textarea, "keyup", /*saveContent*/ ctx[1], false, false, false)
    			];
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*content*/ 1) {
    				set_input_value(textarea, /*content*/ ctx[0]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(dropzone.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(dropzone.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(dropzone);
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function handleInput(e) {
    	/* Handles tabulation on TAB key*/
    	if (e.keyCode == 9 || e.which == 9) {
    		e.preventDefault();
    		var s = this.selectionStart;
    		this.value = this.value.substring(0, this.selectionStart) + "\t" + this.value.substring(this.selectionEnd);
    		this.selectionEnd = s + 1;
    	}
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let content = localStorage.getItem("content");

    	function saveContent(e) {
    		localStorage.setItem("content", content);
    	}

    	function textarea_input_handler() {
    		content = this.value;
    		$$invalidate(0, content);
    	}

    	$$self.$capture_state = () => {
    		return {};
    	};

    	$$self.$inject_state = $$props => {
    		if ("content" in $$props) $$invalidate(0, content = $$props.content);
    	};

    	return [content, saveContent, textarea_input_handler];
    }

    class Editor extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$8, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Editor",
    			options,
    			id: create_fragment$8.name
    		});
    	}
    }

    /* src/App.svelte generated by Svelte v3.18.1 */
    const file$5 = "src/App.svelte";

    function create_fragment$9(ctx) {
    	let main;
    	let div0;
    	let t;
    	let div1;
    	let current;
    	const editor = new Editor({ $$inline: true });
    	const footer = new Footer({ $$inline: true });

    	const block = {
    		c: function create() {
    			main = element("main");
    			div0 = element("div");
    			create_component(editor.$$.fragment);
    			t = space();
    			div1 = element("div");
    			create_component(footer.$$.fragment);
    			attr_dev(div0, "class", "editor-container");
    			add_location(div0, file$5, 31, 2, 885);
    			attr_dev(div1, "class", "footer-container");
    			add_location(div1, file$5, 34, 2, 942);
    			attr_dev(main, "id", "main");
    			add_location(main, file$5, 30, 0, 866);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, div0);
    			mount_component(editor, div0, null);
    			append_dev(main, t);
    			append_dev(main, div1);
    			mount_component(footer, div1, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(editor.$$.fragment, local);
    			transition_in(footer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(editor.$$.fragment, local);
    			transition_out(footer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(editor);
    			destroy_component(footer);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const path = "/themes/";
    const ext = ".css";

    function instance$6($$self) {
    	let themeLoaded = false;
    	let themeName = localStorage.getItem("theme");
    	let theme = `${path}${themeName}${ext}`;
    	const defaultTheme = `${path}default${ext}`;

    	/* Load CSS File */
    	fetch(theme).then(res => {
    		let href = res.ok ? theme : defaultTheme;
    		document.getElementById("stylesheet").href = href;
    	});

    	$$self.$capture_state = () => {
    		return {};
    	};

    	$$self.$inject_state = $$props => {
    		if ("themeLoaded" in $$props) themeLoaded = $$props.themeLoaded;
    		if ("themeName" in $$props) themeName = $$props.themeName;
    		if ("theme" in $$props) theme = $$props.theme;
    	};

    	return [];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$9, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment$9.name
    		});
    	}
    }

    const app = new App({
    	target: document.body,
    	props: {
    		name: 'world'
    	}
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
