import React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import cx from 'classnames';
import contains from './helpers/contains';

import styles from "./styles.module.scss"

class FlipCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hasFocus: false,
			isFlipped: this.props.flipped,
			isMounted: false,
		};

		this.handleFocus = this.handleFocus.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this._hideFlippedSide = this._hideFlippedSide.bind(this);
		this._showBothSides = this._showBothSides.bind(this);
	}

	componentDidMount() {
		this.setState({ isMounted: true });
		this._hideFlippedSide();
	}

	componentWillUnmount() {
		this.setState({ isMounted: false });
	}

	componentWillReceiveProps(newProps) {
		// Make sure both sides are displayed for animation
		this._showBothSides();

		// Wait for display above to take effect
		setTimeout(() => {
			this.setState({
				isFlipped: newProps.flipped,
			});
		}, 0);
	}

	componentWillUpdate(nextProps, nextState) {
		// If card is flipping to back via props, track element for focus
		if (!this.props.flipped && nextProps.flipped) {
			// The element that focus will return to when flipped back to front
			this.focusElement = document.activeElement;
			// Indicates that the back of card needs focus
			this.focusBack = true;
		}

		// If isFlipped has changed need to notify
		if (this.state.isFlipped !== nextState.isFlipped) {
			this.notifyFlip = true;
		}
	}

	componentDidUpdate() {
		// If card has flipped to front, and focus is still within the card
		// return focus to the element that triggered flipping to the back.
		if (
			!this.props.flipped &&
			this.focusElement &&
			contains(findDOMNode(this), document.activeElement)
		) {
			this.focusElement.focus();
			this.focusElement = null;
		}
		// Direct focus to the back if needed
		/* eslint brace-style:0 */
		else if (this.focusBack) {
			this.refs.back.focus();
			this.focusBack = false;
		}

		// Notify card being flipped
		if (this.notifyFlip && typeof this.props.onFlip === 'function') {
			this.props.onFlip(this.state.isFlipped);
			this.notifyFlip = false;
		}

		// Hide whichever side of the card is down
		setTimeout(this._hideFlippedSide, 600);
	}

	handleFocus() {
		if (this.props.disabled || !this.state.isMounted) return;

		this.setState({
			isFlipped: true,
		});
	}

	handleBlur() {
		if (this.props.disabled || !this.state.isMounted) return;

		this.setState({
			isFlipped: false,
		});
	}

	handleKeyDown(e) {
		if (typeof this.props.onKeyDown === 'function') {
			this.props.onKeyDown(e);
		}
	}

	render() {
		return (
			<div
				className={cx({
					[styles.flipContainer]: true,
					[styles.vertical]: this.props.type === 'vertical',
					[styles.hover]: this.state.isFlipped,
				})}
				tabIndex={0}
				onFocus={this.handleFocus}
				onBlur={this.handleBlur}
				onKeyDown={this.handleKeyDown}
			>
				<div className={styles.flipper}>
					<div
						className={styles.front}
						ref="front"
						tabIndex={-1}
						aria-hidden={this.state.isFlipped}
					>
						{this.props.children[0]}
					</div>
					<div
						className={styles.back}
						ref="back"
						tabIndex={-1}
						aria-hidden={!this.state.isFlipped}
					>
						{this.props.children[1]}
					</div>
				</div>
			</div>
		);
	}

	_showBothSides() {
		this.refs.front && (this.refs.front.style.display = '');
		this.refs.back && (this.refs.back.style.display = '');
	}

	_hideFlippedSide() {
		// This prevents the flipped side from being tabbable
		if (this.props.disabled) {
			if (this.state.isFlipped) {
				this.refs.front && (this.refs.front.style.display = 'none');
			} else {
				this.refs.back && (this.refs.back.style.display = 'none');
			}
		}
	}
}

FlipCard.defaultProps = {
	type: 'horizontal',
	flipped: false,
	disabled: false,
};

FlipCard.propTypes = {
	type: PropTypes.string,
	flipped: PropTypes.bool,
	disabled: PropTypes.bool,
	onFlip: PropTypes.func,
	onKeyDown: PropTypes.func,
	children: PropTypes.element,
};

export default FlipCard;
